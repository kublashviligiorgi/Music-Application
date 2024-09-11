import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { IsPhoneNumber } from "class-validator";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) { }

    async create(createUserDto: CreateUserDto) {
        // const newUser = this.userRepository.create(createUserDto)
        // newUser.password = await bcrypt.hash(newUser.password, 10)
        // try {
        //     const result = await this.userRepository.save(newUser);
        //     const { password, ...user } = result
        //     return user
        // } catch (err) {
        //     // console.log(err);
        //     if (err.errno == 1062) {
        //         return 'ეს იმეილი უკვე გამოყენებულია'
        //     }
        // }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

        const newUser = new UserEntity();
        newUser.name = createUserDto.name;
        newUser.email = createUserDto.email;
        newUser.phoneNumber = createUserDto.phoneNumber;
        newUser.password = hashedPassword;

        await this.userRepository.save(newUser)

        const { password, ...rest } = newUser

        return rest

    }
    async findOneWithEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email: email },
            select: { 
                id: true,
                password: true, 
                email: true, 
                roles: true,
                name: true
            }
        })
    }

    async findOneWithPhoneNumber(phoneNumber: string) {
        return await this.userRepository
            .createQueryBuilder('user')
            .where('user.phoneNumber = :phoneNumber', { phoneNumber })
            .getOne()
    }
}