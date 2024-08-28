import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { MusicRepository } from 'src/music/music.repository';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity,AlbumEntity,MusicEntity])],
  controllers: [AuthorController],
  providers: [AuthorService,AuthorRepository,MusicRepository],
  exports:[AuthorRepository]
})
export class AuthorModule {}
