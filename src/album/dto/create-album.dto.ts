import { Type } from "class-transformer";
import { IsArray, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { CreateMusicDto } from "src/music/dto/create-music.dto";

export class CreateAlbumDto {

    @IsString()
    title: string;

    @IsString()
    relaseDate: string;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto[];

    @IsString()
    artistName: string;

    @IsArray()
    @IsOptional()
    musicIds: number[];
}
