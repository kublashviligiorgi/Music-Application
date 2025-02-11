import { IsArray, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMusicDto {

    @MaxLength(100)
    @MinLength(3)
    @IsString()
    name: string

    @IsArray()
    @IsOptional()
    authorId: number[]

    @IsString()
    url: string

    @IsArray()
    @IsOptional()
    albumIds: number[]
    
}

