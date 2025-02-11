import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MusicModule } from 'src/music/music.module';
import { AlbumModule } from 'src/album/album.module';
import { AuthorModule } from 'src/author/author.module';
import { PlaylistModule } from 'src/playlist/playlist.module';

@Module({
  imports: [MusicModule, AlbumModule, AuthorModule, PlaylistModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule { }
