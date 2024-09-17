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
import { ConfigModule } from '@nestjs/config';
import { ListenersModule } from './listeners/listeners.module';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, 
      synchronize: true 
    }),
    MusicModule,
    UserModule, 
    AuthorizationModule,
    AlbumModule,
    SearchModule,
    AuthorModule,
    PlaylistModule,
    ListenersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }