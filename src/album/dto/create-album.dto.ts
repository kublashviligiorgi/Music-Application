import { Type } from "class-transformer";
import { IsArray, IsNumber, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { CreateMusicDto } from "src/music/dto/create-music.dto";

export class CreateAlbumDto {

    @IsString()
    title: string;

    @IsString()
    relaseDate: string;

    @IsArray()
    @ValidateNested()
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto[];

    @IsNumber()
    @IsOptional()
    artistId: number[];

    @IsArray()
    @IsOptional()
    musicIds: number[];
}
