import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlaylistEntity } from "./entities/playlist.entity";
import { Repository } from "typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { CreateSearchDto } from "src/search/dto/create-search.dto";

@Injectable()
export class PlaylistRepository {
    constructor(
        @InjectRepository(PlaylistEntity)
        private readonly playlistRepo: Repository<PlaylistEntity>
    ) { }

    async create(data: CreatePlaylistDto) {
        const newPlaylist = new PlaylistEntity()
        newPlaylist.name = data.name;
        newPlaylist.description = data.description;
        newPlaylist.userId = data.userId;
        newPlaylist.image = data.image;

        return await this.playlistRepo.save(newPlaylist)
    }

    async findAll() {
        return await this.playlistRepo.find()
    }

    async findOne(id: number) {
        return await this.playlistRepo.findOneBy({ id })
    }

    async update(id: number, data: UpdatePlaylistDto) {
        const updatedPlaylist = new PlaylistEntity()
        updatedPlaylist.name = data.name;
        updatedPlaylist.description = data.description;
        updatedPlaylist.userId = data.userId;
        updatedPlaylist.image = data.image;

        return await this.playlistRepo.update(id, updatedPlaylist)
    }

    async remove(id: number) {
        return await this.playlistRepo.softDelete(id)
    }

    async search(query: string) {
        return await this.playlistRepo
            .createQueryBuilder('playlist')
            .where('playlist.name LIKE :query', { query: `%${query}%` })
            .getMany()
    }
}