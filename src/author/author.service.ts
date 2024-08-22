import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService {
  constructor (private readonly authorReposiotry: AuthorRepository) {}
  create(createAuthorDto: CreateAuthorDto) {
    return this.authorReposiotry.create(createAuthorDto);
  }

  findAll() {
    return this.authorReposiotry.findAll();
  }

  findOne(id: number) {
    return this.authorReposiotry.findOne(id);
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorReposiotry.update(id, updateAuthorDto);
  }

  remove(id: number) {
    return this.authorReposiotry.remove(id);
  }
}
