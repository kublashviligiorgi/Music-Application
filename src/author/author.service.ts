import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
import { AuthorEntity } from './entities/author.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';

@Injectable()
export class AuthorService {
  constructor (private readonly authorReposiotry: AuthorRepository) {}
  async create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = new AuthorEntity();
    newAuthor.firstName = createAuthorDto.firstName;
    newAuthor.lastName = createAuthorDto.lastName;
    newAuthor.biography = createAuthorDto.biography;
    const arrayOfMusics = [];
    if (createAuthorDto.musicIds) {
        for (const musicId of createAuthorDto.musicIds) {
            const music = new MusicEntity();
            music.id = musicId;
            arrayOfMusics.push(music);
        }
        newAuthor.musics = arrayOfMusics;
    }
    const arrayOfAlbums = [];
    if (createAuthorDto.albumIds) {
        for (const albumId of createAuthorDto.albumIds) {
            const album = new AlbumEntity();
            album.id = albumId;
            arrayOfAlbums.push(album);
        }
        newAuthor.albums = arrayOfAlbums;
    } try {
        return await this.authorReposiotry.create(newAuthor);
    } catch (err) {
        return 'albumId or musicId is not true'
    };
  }

  findAll() {
    return this.authorReposiotry.findAll();
  }

  findOne(id: number) {
    return this.authorReposiotry.findOne(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const { albumIds, musicIds, ...rest } = updateAuthorDto;
    const updatedAuthor = new AuthorEntity();
    updatedAuthor.id = id;
    Object.assign(updatedAuthor, rest);
    const arrayOfMusics = [];
    if (musicIds) {
        for (const musicId of albumIds) {
            const music = new MusicEntity();
            music.id = musicId;
            arrayOfMusics.push(music);
        }
        updatedAuthor.musics = arrayOfMusics;
    }
    const arrayOfAlbums = [];
    if (albumIds) {
        for (const albumId of albumIds) {
            const album = new AlbumEntity();
            album.id = albumId;
            arrayOfAlbums.push(album);
        }
        updatedAuthor.albums = arrayOfAlbums;
    } try {
        await this.authorReposiotry.update(id, updatedAuthor);
    } catch (err) {
        return 'albumId or musicId is not true'
    }
  }

  remove(id: number) {
    return this.authorReposiotry.remove(id);
  }
}
