import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateAuthorizationDto {
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
