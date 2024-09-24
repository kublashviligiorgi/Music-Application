import { Injectable } from '@nestjs/common';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { ListenersRepository } from './listeners.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenerEntity } from './entities/listener.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListenersService {
    constructor(@InjectRepository(ListenerEntity)
    private readonly listenerRepository: Repository<ListenerEntity>,
      private readonly listenersRepository: ListenersRepository
    ) { }
  async create(createListenerDto: CreateListenerDto, userId: number) {
    try{
      const newListener = new ListenerEntity()
    newListener.musicId=createListenerDto.musicId
    newListener.userId=userId
    console.log(newListener);
    
    return await this.listenersRepository.create(newListener);
    } catch(err) {
     return "musicId is not true"
    }
  }

  findAllWithMusicId(id:number) {
    return this.listenersRepository.findAllWithMusicId(id)
  }
  findAllWithUserId() {

  }
}
