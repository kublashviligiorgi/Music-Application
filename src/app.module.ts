import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { MusicModule } from './music/music.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { SearchModule } from './search/search.module';
import { AuthorModule } from './author/author.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'inserts123',
      database: 'musicAplicaton',
      autoLoadEntities: true,
      synchronize: true
    }),
    MusicModule,
    UserModule, 
    AuthorizationModule,
    AlbumModule,
    SearchModule,
    AuthorModule,
    PlaylistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }