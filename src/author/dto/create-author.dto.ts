import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsArray()
    @IsNotEmpty()
    musics: [];

    @IsString()
    biography: string;
}
