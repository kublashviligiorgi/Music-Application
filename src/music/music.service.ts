import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { Repository } from 'typeorm';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { MusicEntity } from './entities/music.entity';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository
  ) { }
  async create(createMusicDto: CreateMusicDto) {
    const newMusic = new MusicEntity()
    newMusic.name = createMusicDto.name
    newMusic.url = createMusicDto.url
    let artist: any;
    if (createMusicDto.authorId) {
      for (const artistId of createMusicDto.authorId) {
        const author = new AuthorEntity();
        author.id = artistId;
        artist = author;
      }
      newMusic.authorId = artist
    }
    const arrayOfAlbums = []
    if (createMusicDto.albumIds) {
      for (const albumId of createMusicDto.albumIds) {
        const album = new AlbumEntity();
        album.id = albumId;
        arrayOfAlbums.push(album);
      }
      newMusic.albums = arrayOfAlbums;
    } try {
      return this.musicRepository.create(newMusic);
    } catch (err) {
      return 'albumId or authorId is not true'
    }
  }

  async findAll() {
    return await this.musicRepository.findAll();
  }

  async findOne(id: number) {
    return await this.musicRepository.findOne(id);
  }

  async update(id: number, data: UpdateMusicDto) {
    const { albumIds, ...rest } = data
    const updatedMusic = new MusicEntity()
    updatedMusic.id = id
    Object.assign(updatedMusic, rest)
    const arrayOfAlbums = []
    if (albumIds) {
        for (const albumId of albumIds) {
            const album = new AlbumEntity();
            album.id = albumId;
            arrayOfAlbums.push(album)
        }
        updatedMusic.albums = arrayOfAlbums
    } try {
        await this.musicRepository.update(id,updatedMusic)
    } catch (err) {
        return 'albumId is not true'
    }
}

  async remove(id: number) {
    return await this.musicRepository.remove(id);
  }
}
