import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }
  create(createUserDto: CreateUserDto) {
    if(createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('password do not match')
    }
    return this.userRepository.create(createUserDto);
  }
}
