import { IsArray, IsDefined, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsArray()
    @IsDefined()
    musicIds: number[];

    @IsString()
    userId: string;

    @IsString()
    image: string;
}
