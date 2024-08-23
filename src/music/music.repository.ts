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
        private readonly muscReposiotry: Repository<MusicEntity>,
        @InjectRepository(AlbumEntity)
        private readonly albumRepo: Repository<AlbumEntity>
    ) { }

    async create(data: CreateMusicDto) {
        const newMusic = new MusicEntity()
        newMusic.name = data.name
        newMusic.url = data.url
        let artist: any;
        if (data.authorId) {
            for (const artistId of data.authorId) {
                const author = new AuthorEntity();
                author.id = artistId;
                artist = author;
            }
            newMusic.authorId = artist
        }
        const arrayOfAlbums = []
        if (data.albumIds) {
            for (const albumId of data.albumIds) {
                const album = new AlbumEntity();
                album.id = albumId;
                arrayOfAlbums.push(album);
            }
            newMusic.albums = arrayOfAlbums;
        } try {
            return await this.muscReposiotry.save(newMusic);
        } catch (err) {
            return 'albumId or authorId is not true'
        }
    }

    async createManyMusic(musics: any) {
        const arrayOfMusics = []
        for (let i = 0; i < musics.length; i++) {
            const newMusic = new MusicEntity()
            newMusic.name = musics[i].name;
            newMusic.authorId = musics[i].authorId;
            newMusic.url = musics[i].url;
            await this.muscReposiotry.save(newMusic)
            arrayOfMusics.push(newMusic)
        }
        return arrayOfMusics
    }

    async findAll() {
        return await this.muscReposiotry.find({ relations: { albums: true, authorId: true } })
    }

    async findOne(id: number) {
        return await this.muscReposiotry
            .createQueryBuilder('music')
            .leftJoinAndSelect('music.albums', 'album')
            .andWhere('music.id = :id', { id })
            .getOne()
    }

    async update(id: number, data: UpdateMusicDto) {
        const { albumIds, ...rest } = data
        const updatedMusic = new MusicEntity()
        updatedMusic.id = id
        Object.assign(updatedMusic, rest)
        const arrayOfAlbums = []
        if (albumIds) {
            for (const albumId of albumIds) {
                const album = new AlbumEntity();
                album.id = albumId;
                arrayOfAlbums.push(album)
            }
            updatedMusic.albums = arrayOfAlbums
        } try {
            await this.muscReposiotry.save(updatedMusic)
            return await this.muscReposiotry.findOne({ where: { id }, relations: { albums: true } })
        } catch (err) {
            return 'albumId is not true'
        }
    }

    async remove(id: number) {
        await this.muscReposiotry.softDelete(id)
        return this.muscReposiotry
            .createQueryBuilder('music')
            .withDeleted()
            .where('music.id = :id', { id })
            .getOne()
    }

    async search(query: string) {
        return await this.muscReposiotry
            .createQueryBuilder('music')
            .where('music.name LIKE :query', { query: `%${query}%` })
            .getMany()
    }
}