import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ListenerEntity } from "./entities/listener.entity"
import { Repository } from "typeorm"
import { CreateListenerDto } from "./dto/create-listener.dto"

@Injectable()
export class ListenersRepository {
    constructor(
        @InjectRepository(ListenerEntity)
        private readonly listenerRepository: Repository<ListenerEntity>,
    ) { }

    async create(createListenerDto: CreateListenerDto,userId:number) {
        const newListener = new ListenerEntity()
        newListener.musicId=createListenerDto.musicId
        newListener.userId=userId
        console.log(newListener);
        
        return await this.listenerRepository.save(newListener)
    }
}