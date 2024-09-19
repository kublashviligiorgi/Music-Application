import { Body, Controller, Post } from "@nestjs/common";
import { AuthorizationService } from "./authorization.service";
import { CreateAuthorizationDto } from "./dto/create-authorization.dto";
import { Public } from "./decorators/public.decorator";

@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authService: AuthorizationService) { }

  @Public()
  @Post('login')
  create(@Body() createAuthDto: CreateAuthorizationDto) {
    return this.authService.login(createAuthDto);
  } 
}

