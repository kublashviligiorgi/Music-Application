import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.reposiotry';
import { PlaylistEntity } from './entities/playlist.entity';
import { MusicEntity } from 'src/music/entities/music.entity';

@Injectable()
export class PlaylistService {
  constructor(private readonly playlistRepository: PlaylistRepository) { }
  async create(createPlaylistDto: CreatePlaylistDto) {
    const newPlaylist = new PlaylistEntity()
    newPlaylist.name = createPlaylistDto.name;
    newPlaylist.description = createPlaylistDto.description;
    newPlaylist.userId = createPlaylistDto.userId;
    newPlaylist.image = createPlaylistDto.image;
    const arrayOfMusics = []
    if (createPlaylistDto.musicIds) {
      for (const musicId of createPlaylistDto.musicIds) {
        const music = new MusicEntity();
        music.id = musicId;
        arrayOfMusics.push(music);
      }
      newPlaylist.musics = arrayOfMusics;
    } try {
      return await this.playlistRepository.create(newPlaylist);
    } catch (err) {
      return 'musicId is not true'
    }
  }

  async findAll() {
    return await this.playlistRepository.findAll();
  }

  async findOne(id: number) {
    return await this.playlistRepository.findOne(id);
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistRepository.update(id, updatePlaylistDto);
  }

  async remove(id: number) {
    return await this.playlistRepository.remove(id);
  }
}
