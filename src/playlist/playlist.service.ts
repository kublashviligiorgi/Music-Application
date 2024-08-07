import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.reposiotry';

@Injectable()
export class PlaylistService {
  constructor(private readonly playlistRepository: PlaylistRepository) { }
  create(createPlaylistDto: CreatePlaylistDto) {
    return this.playlistRepository.create(createPlaylistDto);
  }

  findAll() {
    return this.playlistRepository.findAll();
  }

  findOne(id: number) {
    return this.playlistRepository.findOne(id);
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistRepository.update(id, updatePlaylistDto);
  }

  remove(id: number) {
    return this.playlistRepository.remove(id);
  }
}
