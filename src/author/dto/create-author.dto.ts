import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsArray()
    @IsNotEmpty()
    musics: number[];

    @IsArray()
    @IsOptional()
    musicIds: number[];

    @IsArray()
    @IsOptional()
    albumIds: number[];

    @IsString()
    biography: string;
}
