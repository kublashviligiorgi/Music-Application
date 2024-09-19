import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { UserRepository } from 'src/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule { }