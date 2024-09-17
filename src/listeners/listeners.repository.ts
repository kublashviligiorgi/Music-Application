import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListenerEntity } from "./entities/listener.entity";
import { Repository } from "typeorm";
import { CreateListenerDto } from "./dto/create-listener.dto";

@Injectable()
export class ListenerRepository {
    constructor(
        @InjectRepository(ListenerEntity)
        private readonly listenerRepository: Repository<ListenerEntity>,
    ) { }

    async create(createListenerDto: CreateListenerDto) {
        const newListener = new ListenerEntity()
        newListener.musicId=createListenerDto.musicId
        newListener.userId=createListenerDto.userId
        return await this.listenerRepository.save(newListener)
    }
}