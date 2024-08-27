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
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
    ) { }

    async create(newAlbum: object) {
        return await this.albumRepository.save(newAlbum)
    }

    async findAll() {
        return await this.albumRepository.find({ relations: { musics: true, author: true } })
    }

    async findOne(id: number) {
        return await this.albumRepository
            .createQueryBuilder('album')
            .leftJoinAndSelect('album.musics', 'music')
            .leftJoinAndSelect('album.author', 'author')
            .andWhere('album.id = :id', { id })
            .getOne()
    }

    async update(id: number, updatedAlbum: object) {

        await this.albumRepository.update(id, updatedAlbum)
        return await this.albumRepository.findOne({ where: { id }, relations: { musics: true } })
    }

    async remove(id: number) {
        return await this.albumRepository
            .createQueryBuilder('album')
            .withDeleted()
            .where('album.id = :id', { id })
            .getOne()
    }

    async search(query: string) {
        return await this.albumRepository
            .createQueryBuilder('album')
            .where('album.title LIKE :query', { query: `%${query}%` })
            .getMany()
    }
}