import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateAuthDto {
    @IsPhoneNumber()
    phoneNumber: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
