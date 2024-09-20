import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile (@UploadedFile() file: Express.Multer.File) {
        console.log(1);
        
        return this.filesService.uploadFile(file)
    }

    @Get(':id')
    getFile(@Param('id') id: number) { 
        return this.filesService.getFile(id)
    }
}
