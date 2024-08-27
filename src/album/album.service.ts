import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AlbumEntity } from './entities/album.entity';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { MusicRepository } from 'src/music/music.repository';


@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(MusicEntity)
    private readonly musicRepository: Repository<MusicEntity>,
    private readonly albumRepository: AlbumRepository,
  private readonly musicRepo: MusicRepository) { }
  async create(createAlbumDto: CreateAlbumDto) {
    const { musics, artistId, ...rest } = createAlbumDto
    const newAlbum = new AlbumEntity()
    newAlbum.title = createAlbumDto.title;
    newAlbum.relaseDate = createAlbumDto.relaseDate;
    newAlbum.artistName = createAlbumDto.artistName;
    let arrayOfMusics: any[];
    let artist: any;
    if (artistId) {
      for (const artistsId of artistId) {
        const author = new AuthorEntity()
        author.id = artistsId
        artist = author
      }
      newAlbum.author = artist
    }
    if (musics) {
      arrayOfMusics = await this.musicRepo.createManyMusic(musics)
    }
    if (createAlbumDto.musicIds) {
      for (const musicId of createAlbumDto.musicIds) {
        const music = new MusicEntity()
        music.id = musicId
        arrayOfMusics.push(music)
      }
      newAlbum.musics = arrayOfMusics
    }
    try {
      return await this.albumRepository.create(newAlbum)
    } catch (err) {
      return 'musicId or authorId is not true'
    }
  }

  findAll() {
    return this.albumRepository.findAll();
  }

  findOne(id: number) {
    return this.albumRepository.findOne(id);
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const {musicIds, ...rest} = updateAlbumDto;
    const updatedAlbum = new AlbumEntity()
    updatedAlbum.id = id;
    Object.assign(updatedAlbum, rest)
    const arrayOfMusics = []
    if (musicIds) {
        for (const albumId of musicIds) {
            const music = new MusicEntity();
            music.id = albumId;
            arrayOfMusics.push(music)
        }
        updatedAlbum.musics = arrayOfMusics
    } try {
        await this.albumRepository.update(id, updatedAlbum)
    } catch (err) {
        return 'musicId is not true'
    }
  }

  remove(id: number) {
    return this.albumRepository.remove(id);
  }
}
