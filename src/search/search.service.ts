import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { AlbumRepository } from 'src/album/album.repository';
import { MusicRepository } from 'src/music/music.repository';
import { AuthorRepository } from 'src/author/author.repository';
import { PlaylistRepository } from 'src/playlist/playlist.reposiotry';

@Injectable()
export class SearchService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly musicRepository: MusicRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly playlistRepository: PlaylistRepository
  ) { }

  async findAll(data: CreateSearchDto) {
    const music = await this.musicRepository.search(data.query)
    const album = await this.albumRepository.search(data.query)
    const author = await this.authorRepository.search(data.query)
    const playlist = await this.playlistRepository.search(data.query)
    return { music, album, author, playlist }
  }
}
