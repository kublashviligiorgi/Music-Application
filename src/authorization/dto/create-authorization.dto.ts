import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateAuthorizationDto {
    @IsPhoneNumber()
    phoneNumber: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
