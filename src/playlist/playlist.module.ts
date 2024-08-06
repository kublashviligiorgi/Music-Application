import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { PlaylistRepository } from './playlist.reposiotry';

@Module({
  imports:[TypeOrmModule.forFeature([PlaylistEntity])],
  controllers: [PlaylistController],
  providers: [PlaylistService,PlaylistRepository],
  exports: [PlaylistRepository]
})
export class PlaylistModule {}
