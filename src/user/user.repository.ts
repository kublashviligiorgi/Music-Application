import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { IsPhoneNumber } from "class-validator";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>) { }

    async create(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create(createUserDto)
        newUser.password = await bcrypt.hash(newUser.password, 10)
        try {
            const result = await this.userRepository.save(newUser);
            const { password, ...user } = result
            return user
        } catch (err) {
            // console.log(err);
            if (err.errno == 1062) {
                return 'ეს იმეილი უკვე გამოყენებულია'
            }
        }
    }
    async findOneWithEmail(email: string) {
        return await this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne()
    }

    async findOneWithPhoneNumber(phoneNumber: string) {
        return await this.userRepository
            .createQueryBuilder('user')
            .where('user.phoneNumber = :phoneNumber', { phoneNumber })
            .getOne()
    }
}