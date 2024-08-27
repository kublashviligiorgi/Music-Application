import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsArray()
    @IsNotEmpty()
    musics: Number[];

    @IsArray()
    @IsOptional()
    musicIds: [];

    @IsArray()
    @IsOptional()
    albumIds: []

    @IsString()
    biography: string;
}
