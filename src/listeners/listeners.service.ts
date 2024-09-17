import { Injectable } from '@nestjs/common';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { ListenerEntity } from './entities/listener.entity';
import { ListenerRepository } from './listeners.repository';


@Injectable()
export class ListenersService {
    constructor(private readonly listenersRepository: ListenerRepository
    ) { }
  async create(createListenerDto: CreateListenerDto) {
    return await this.listenersRepository.create(createListenerDto);
  }

  findAllWithMusicId() {

  }
  findAllWithUserId() {

  }
}
