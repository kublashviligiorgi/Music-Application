import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { MusicEntity } from "./entities/music.entity"
import { Repository } from "typeorm"
import { CreateMusicDto } from "./dto/create-music.dto"
import { UpdateMusicDto } from "./dto/update-music.dto"

@Injectable()
export class MusicRepository {
    constructor(
        @InjectRepository(MusicEntity)
        private readonly muscReposiotry: Repository<MusicEntity>,
    ) { }

    async create(data: CreateMusicDto) {
        const newMusic = new MusicEntity()
        newMusic.name = data.name
        newMusic.authorId = data.authorId
        newMusic.url = data.url
        return await this.muscReposiotry.save(newMusic)
    }

    findAll() {
        return this.muscReposiotry.find()
    }

    fondOne(id: number) {
        return this.muscReposiotry
            .createQueryBuilder('music')
            .andWhere('music.id = :id', { id })
            .getOne()
    }

    async update(id: number, data: UpdateMusicDto) {
        const updatedMusic = new MusicEntity()
        updatedMusic.id = id
        updatedMusic.name = data.name
        updatedMusic.url = data.url
        updatedMusic.authorId = data.authorId
        return this.muscReposiotry.update(id, updatedMusic)
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