import { IsString } from "class-validator";

export class CreateFileDto {

    @IsString()
    url: string;

    @IsString()
    filename: string;

    @IsString()
    key: string;

    @IsString()
    bucket: string;

}