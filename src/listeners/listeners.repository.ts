import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ListenerEntity } from "./entities/listener.entity"
import { Repository } from "typeorm"
import { CreateListenerDto } from "./dto/create-listener.dto"

@Injectable()
export class ListenersRepository {
    constructor(
        @InjectRepository(ListenerEntity)
        private readonly listenersRepository: Repository<ListenerEntity>,
    ) { }

    async create(newListener: object) {
        return await this.listenersRepository.save(newListener)
    }

    async findAllWithMusicId(id: number) {
        const countedAvarage = await this.listenersRepository
            .createQueryBuilder('listeners')
            .andWhere('listeners.music = :id', { id })
            .getCount()
        return countedAvarage
    }
}