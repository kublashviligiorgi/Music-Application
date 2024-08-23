import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "./entities/author.entity";
import { Repository } from "typeorm";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAlbumDto } from "src/album/dto/update-album.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { AlbumEntity } from "src/album/entities/album.entity";
import { AlbumRepository } from "src/album/album.repository";
import { MusicEntity } from "src/music/entities/music.entity";

@Injectable()
export class AuthorRepository {

    constructor(
        // private readonly albumRepository: AlbumRepository,
        @InjectRepository(AuthorEntity)
        private readonly authorRepo: Repository<AuthorEntity>,
        @InjectRepository(MusicEntity)
        private readonly musicRepo: Repository<MusicEntity>

    ) { }

    async create(data: CreateAuthorDto) {
        const newAuthor = new AuthorEntity();
        newAuthor.firstName = data.firstName;
        newAuthor.lastName = data.lastName;
        newAuthor.biography = data.biography;
        const arrayOfMusics = [];
        if (data.musicIds) {
            for (const musicId of data.musicIds) {
                const music = new MusicEntity();
                music.id = musicId;
                arrayOfMusics.push(music);
            }
            newAuthor.musics = arrayOfMusics;
        }
        const arrayOfAlbums = [];
        if (data.albumIds) {
            for (const albumId of data.albumIds) {
                const album = new AlbumEntity();
                album.id = albumId;
                arrayOfAlbums.push(album);
            }
            newAuthor.albums = arrayOfAlbums;
        } try {
            return await this.authorRepo.save(newAuthor);
        } catch (err) {
            return 'albumId or musicId is not true'
        }
    }

    async findAll() {
        return await this.authorRepo.find({ relations: { albums: true, musics: true } });
    }

    async findOne(id: number) {
        return await this.authorRepo
            .createQueryBuilder('author')
            .leftJoinAndSelect('author.albums', 'album')
            .andWhere('author.id = :id', { id })
            .getOne();
    }

    async update(id: number, data: UpdateAuthorDto) {
        const { albumIds, musicIds, ...rest } = data;
        const updatedAuthor = new AuthorEntity();
        updatedAuthor.id = id;
        Object.assign(updatedAuthor, rest);
        const arrayOfMusics = [];
        if (musicIds) {
            for (const musicId of albumIds) {
                const music = new MusicEntity();
                music.id = musicId;
                arrayOfMusics.push(music);
            }
            updatedAuthor.musics = arrayOfMusics;
        }
        const arrayOfAlbums = [];
        if (albumIds) {
            for (const albumId of albumIds) {
                const album = new AlbumEntity();
                album.id = albumId;
                arrayOfAlbums.push(album);
            }
            updatedAuthor.albums = arrayOfAlbums;
        } try {
            await this.authorRepo.save(updatedAuthor);
            return await this.authorRepo.findOne({ where: { id }, relations: { albums: true } });
        } catch (err) {
            return 'albumId or musicId is not true'
        }
    }

    async remove(id: number) {
        return await this.authorRepo
            .createQueryBuilder('author')
            .withDeleted()
            .where('author.id = :id', { id })
            .getOne();
    }
    async search(query: string) {
        return await this.authorRepo
            .createQueryBuilder('author')
            .where('author.firstName LIKE :query', { query: `%${query}%` })
            .andWhere('author.lastName LIKE :query', { query: `%${query}%` })
            .getMany();
    }
}