import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { MusicModule } from 'src/music/music.module';
import { MusicRepository } from 'src/music/music.repository';
@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity,MusicEntity])],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository,MusicRepository], 
  exports: [AlbumRepository]
})
export class AlbumModule { }
