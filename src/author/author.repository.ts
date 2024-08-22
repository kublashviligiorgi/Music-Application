import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "./entities/author.entity";
import { Repository } from "typeorm";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAlbumDto } from "src/album/dto/update-album.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Injectable()
export class AuthorRepository {
  
    constructor(
        @InjectRepository(AuthorEntity)
        private readonly authorRepo: Repository<AuthorEntity>
    ) { }

    async create(data: CreateAuthorDto) {
        const newAuthor = new AuthorEntity()
        newAuthor.firstName = data.firstName;
        newAuthor.lastName = data.lastName;
        newAuthor.biography = data.biography;
        return await this.authorRepo.save(newAuthor)
    }

   async  findAll() {
        return await this.authorRepo.find()
    }

    async findOne(id: number) {
        return await this.authorRepo.findOneBy({ id })
    }

    async update(id: number, data: UpdateAuthorDto) {
        const updatedAuthor = new AuthorEntity()

        updatedAuthor.firstName = data.firstName;
        updatedAuthor.lastName = data.lastName;
        updatedAuthor.biography = data.biography;

        return await this.authorRepo.update(id, updatedAuthor)
    }

   async remove(id: number) {
        return await this.authorRepo.softDelete(id)
    }
    async search(query: string) {
        return await this.authorRepo
            .createQueryBuilder('author')
            .where('author.firstName LIKE :query', { query: `%${query}%` })
            .andWhere('author.lastName LIKE :query', {query: `%${query}%`})
            .getMany()
    }
}