import { Injectable } from "@nestjs/common";
import { FileEntity } from "./file.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFileDto } from "./dto/create-file.dto";

@Injectable()
export class FilesReposiotry {
    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepo: Repository<FileEntity>
    ) { }

    async save(fileName: string, url: string, key: string, bucket: string) {
        const newFile = new FileEntity()

        newFile.filename = fileName;
        newFile.url = url;
        newFile.key = key;
        newFile.bucket = bucket;

        return await this.fileRepo.save(newFile)
    }

    findOne(id: number) {
        return this.fileRepo.findOne({ where: { id } })
    }
}


