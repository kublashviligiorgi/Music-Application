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

    create(data: CreatePlaylistDto) {
        const newPlaylist = new PlaylistEntity()
        newPlaylist.name = data.name;
        newPlaylist.description = data.description;
        newPlaylist.userId = data.userId;
        newPlaylist.image = data.image;

        return this.playlistRepo.save(newPlaylist)
    }

    findAll() {
        return this.playlistRepo.find()
    }

    findOne(id: number) {
        return this.playlistRepo.findOneBy({ id })
    }

    update(id: number, data: UpdatePlaylistDto) {
        const updatedPlaylist = new PlaylistEntity()
        updatedPlaylist.name = data.name;
        updatedPlaylist.description = data.description;
        updatedPlaylist.userId = data.userId;
        updatedPlaylist.image = data.image;

        return this.playlistRepo.update(id, updatedPlaylist)
    }

    remove(id: number) {
        return this.playlistRepo.softDelete(id)
    }

    async search(query: string) {
        return this.playlistRepo
            .createQueryBuilder('playlist')
            .where('playlist.name LIKE :query', { query: `%${query}%` })
            .getMany()
    }
}