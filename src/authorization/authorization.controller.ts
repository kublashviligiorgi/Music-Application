import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./authorization.service";
import { CreateAuthDto } from "./dto/create-authorization.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto.email, createAuthDto.password, createAuthDto.phoneNumber);
  } 
}

