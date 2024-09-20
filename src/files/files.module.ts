import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { FilesReposiotry } from './files.repository';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), AwsModule],
  controllers: [FilesController],
  providers: [FilesService, FilesReposiotry]
})
export class FilesModule {}
