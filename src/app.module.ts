import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MusicModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'inserts123',
      database: 'mus-app',
      autoLoadEntities: true,
      synchronize: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }