import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { MusicRepository } from './music.repository';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { AlbumModule } from 'src/album/album.module';
import { AlbumRepository } from 'src/album/album.repository';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { AuthorModule } from 'src/author/author.module';
import { AuthorRepository } from 'src/author/author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity, AlbumEntity,AuthorEntity])],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository,AlbumRepository,AuthorRepository],
  exports: [MusicRepository]
})
export class MusicModule { }
