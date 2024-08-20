import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumEntity } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { MusicEntity } from "src/music/entities/music.entity";
import { MusicRepository } from "src/music/music.repository";

@Injectable()
export class AlbumRepository {
    constructor(private readonly musicrepository: MusicRepository,
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>) { }

    async create(data: CreateAlbumDto) {
        const { musics, ...rest } = data
        const newAlbum = new AlbumEntity()
        newAlbum.title = data.title;
        newAlbum.relaseDate = data.relaseDate;
        newAlbum.artistName = data.artistName;
        let arrayOfMusics;
        if (musics) {
            arrayOfMusics = await this.musicrepository.createManyMusic(musics)
        }
        if (data.musicIds) {
            for (const musicId of data.musicIds) {
                const music = new MusicEntity()
                music.id = musicId
                arrayOfMusics.push(music)
            }
            newAlbum.musics = arrayOfMusics
        }
        try {
            return this.albumRepository.save(newAlbum)
        } catch (err) {
            return 'musicId or authorId is not true'
        }
    }

    findAll() {
        return this.albumRepository.find()
    }

    findOne(id: number) {
        return this.albumRepository.findOneBy({ id })
    }

    update(id: number, data: UpdateAlbumDto) {
        const updatedAlbum = new AlbumEntity()
        updatedAlbum.id = id;
        updatedAlbum.relaseDate = data.relaseDate;
        updatedAlbum.title = data.title;
        updatedAlbum.artistName = data.artistName;

        return this.albumRepository.update(id, updatedAlbum)
    }

    remove(id: number) {
        return this.albumRepository.softDelete(id)
    }

    async search(query: string) {
        return await this.albumRepository
            .createQueryBuilder('album')
            .where('album.title LIKE :query', { query: `%${query}%` })
            .getMany()
    }
}