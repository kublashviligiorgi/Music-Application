import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumEntity } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Injectable()
export class AlbumRepository {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ) { }

    async create(data: CreateAlbumDto) {
        const newAlbum = new AlbumEntity()
        newAlbum.title = data.title;
        newAlbum.relaseDate = data.relaseDate;
        newAlbum.artistName = data.artistName;

        return await this.albumRepository.save(newAlbum)
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