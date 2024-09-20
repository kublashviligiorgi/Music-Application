import { Injectable } from '@nestjs/common';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { ListenersRepository } from './listeners.repository';

@Injectable()
export class ListenersService {
    constructor(private readonly listenersRepository: ListenersRepository
    ) { }
  async create(createListenerDto: CreateListenerDto, userId: number) {
    console.log(userId);
    
    return await this.listenersRepository.create(createListenerDto,userId);
  }

  findAllWithMusicId() {

  }
  findAllWithUserId() {

  }
}
