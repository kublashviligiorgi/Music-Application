import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserRepository } from "src/user/user.repository"
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { log } from "console";
import { CreateAuthorizationDto } from "./dto/create-authorization.dto";

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) { }

  async login(data: CreateAuthorizationDto) {
    const user = await (this.userRepository.findOneWithEmail(data.email) || this.userRepository.findOneWithPhoneNumber(data.phoneNumber))

    if(!user) {
      throw new UnauthorizedException('Accsses Denide');
    } 

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password)

    if(!isPasswordCorrect) {
      throw new UnauthorizedException('Accsses Denide')
    }

    const payload = await this.jwtService.signAsync({
              id: user.id,
              name: user.name,
    })
      
      const {password, ...rest} = user

      return payload
      
    
  }
}
