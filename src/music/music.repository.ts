import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { MusicEntity } from "./entities/music.entity"
import { Repository } from "typeorm"
import { CreateMusicDto } from "./dto/create-music.dto"
import { UpdateMusicDto } from "./dto/update-music.dto"
import { AlbumEntity } from "src/album/entities/album.entity"
import { AlbumRepository } from "src/album/album.repository"
import { AuthorEntity } from "src/author/entities/author.entity"

@Injectable()
export class MusicRepository {
    constructor(
        @InjectRepository(MusicEntity)
        private readonly musicReposiotry: Repository<MusicEntity>) { }

    async create(newMusic:object) {
         return await this.musicReposiotry.save(newMusic)
    }

    async createManyMusic(musics: any) {
        const arrayOfMusics = []
        for (let i = 0; i < musics.length; i++) {
            const newMusic = new MusicEntity()
            newMusic.name = musics[i].name;
            newMusic.authorId = musics[i].authorId;
            newMusic.url = musics[i].url;
            await this.musicReposiotry.save(newMusic)
            arrayOfMusics.push(newMusic)
        }
        return arrayOfMusics
    }

    async findAll() {
        return await this.musicReposiotry.find({ relations: { albums: true, authorId: true } })
    }

    async findOne(id: number) {
        return await this.musicReposiotry
            .createQueryBuilder('music')
            .leftJoinAndSelect('music.albums', 'album')
            .andWhere('music.id = :id', { id })
            .getOne()
    }

    async update(id:number,updatedMusic:object) {
            await this.musicReposiotry.save(updatedMusic)
            return await this.musicReposiotry.findOne({ where: { id }, relations: { albums: true } })
    }

    async remove(id: number) {
        await this.musicReposiotry.softDelete(id)
        return this.musicReposiotry
            .createQueryBuilder('music')
            .withDeleted()
            .where('music.id = :id', { id })
            .getOne()
    }

    async search(query: string) {
        return await this.musicReposiotry
            .createQueryBuilder('music')
            .where('music.name LIKE :query', { query: `%${query}%` })
            .getMany()
    }
}