import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { AlbumRepository } from 'src/album/album.repository';
import { MusicRepository } from 'src/music/music.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly musicRepository: MusicRepository
  ) { }

  async findAll(data: CreateSearchDto) {
    const music = await this.musicRepository.search(data.query)
    const album = await this.albumRepository.search(data.query)
    return { music, album }
  }
}
