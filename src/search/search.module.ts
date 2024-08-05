import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MusicModule } from 'src/music/music.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [MusicModule, AlbumModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule { }
