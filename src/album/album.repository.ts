import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumEntity } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { MusicEntity } from "src/music/entities/music.entity";
import { MusicRepository } from "src/music/music.repository";
import { AuthorEntity } from "src/author/entities/author.entity";

@Injectable()
export class AlbumRepository {
    musicrepository: any;
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

        @InjectRepository(MusicEntity)
        private readonly musicRepository: Repository<MusicEntity>,
    )  { }

    async create(data: CreateAlbumDto) {
        const { musics, artistId, ...rest } = data
        const newAlbum = new AlbumEntity()
        newAlbum.title = data.title;
        newAlbum.relaseDate = data.relaseDate;
        newAlbum.artistName = data.artistName;
        let arrayOfMusics: any[];
        let artist: any;
        if (artistId) {
            for (const artistsId of artistId) {
                const author = new AuthorEntity()
                author.id = artistsId
                artist = author
            }
            newAlbum.author = artist
        }
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

    async findAll() {
        return await this.albumRepository.find({relations: {musics:true, author: true}})
    }

    async findOne(id: number) {
        return await this.albumRepository
            .createQueryBuilder('album')
            .leftJoinAndSelect('album.musics', 'music')
            .leftJoinAndSelect('album.author', 'author')
            .andWhere('album.id = :id', { id })
            .getOne()
    }

    async update(id: number, data: UpdateAlbumDto) {
        const {musicIds, ...rest} = data;
        const updatedAlbum = new AlbumEntity()
        updatedAlbum.id = id;
        Object.assign(updatedAlbum, rest)
        const arrayOfMusics = []
        if (musicIds) {
            for (const albumId of musicIds) {
                const music = new MusicEntity();
                music.id = albumId;
                arrayOfMusics.push(music)
            }
            updatedAlbum.musics = arrayOfMusics
        } try {
            await this.albumRepository.save(updatedAlbum)
            return await this.albumRepository.findOne({ where: { id }, relations: { musics: true } })
        } catch (err) {
            return 'musicId is not true'
        }
    }

    async remove(id: number) {
        return await this.albumRepository
                .createQueryBuilder('album')
                .withDeleted()
                .where('album.id = :id', {id})
                .getOne()
    }

    async search(query: string) {
        return await this.albumRepository
            .createQueryBuilder('album')
            .where('album.title LIKE :query', { query: `%${query}%` })
            .getMany()
    }
}