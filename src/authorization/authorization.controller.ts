import { Body, Controller, Post } from "@nestjs/common";
import { AuthorizationService } from "./authorization.service";
import { CreateAuthorizationDto } from "./dto/create-authorization.dto";

@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authService: AuthorizationService) { }

  @Post()
  create(@Body() createAuthDto: CreateAuthorizationDto) {
    return this.authService.login(createAuthDto.email, createAuthDto.password, createAuthDto.phoneNumber);
  } 
}

