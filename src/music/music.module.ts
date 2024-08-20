import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { MusicRepository } from './music.repository';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { AlbumModule } from 'src/album/album.module';
import { AlbumRepository } from 'src/album/album.repository';

@Module({
  imports: [AlbumModule,TypeOrmModule.forFeature([MusicEntity, AlbumEntity])],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
  exports: [MusicRepository]
})
export class MusicModule { }
