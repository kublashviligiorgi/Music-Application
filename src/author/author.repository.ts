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

    async create(newAuthor: object) {
        return await this.authorRepo.save(newAuthor)
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

    async update(id: number, updatedAuthor: object) {
        await this.authorRepo.update(id, updatedAuthor)
        return await this.authorRepo.findOne({ where: { id }, relations: { albums: true } });
    }

    async remove(id: number) {
        await this.authorRepo.softDelete(id)
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