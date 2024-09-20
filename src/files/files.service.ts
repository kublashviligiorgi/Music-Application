import { Injectable } from '@nestjs/common';
import { FilesReposiotry } from './files.repository';
import { FileEntity } from './file.entity';
import { S3Services } from 'src/aws/services/s3.services';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {
    constructor(private readonly filesReposiotry: FilesReposiotry, private readonly s3Service: S3Services) { }
    async uploadFile(file: Express.Multer.File) {

        const fileName =  file.originalname.split('.').slice(0, -1).join('.')
        console.log(fileName);
        

        const result = await this.s3Service.upload(file, fileName)
        
        const savedfile :FileEntity = await this.filesReposiotry.save(
            fileName, 
            result.Location,
            result.Key,
            result.Bucket
        )

        return savedfile
    }

    async getFile(fileId: number) {
        const file = await this.filesReposiotry.findOne(fileId)
        

        const presignedUrl = await this.s3Service.getPresignedUrl(file.key)

        
        file.url = presignedUrl
        
        return file
    }
}
