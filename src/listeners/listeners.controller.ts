import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';

@Controller('listeners')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) {}

  @Post()
  create(@Body() createListenerDto: CreateListenerDto) {
    return this.listenersService.create(createListenerDto);
  }

  @Get()
  findAllWithMusicId(@Body() musicId:string) {
    return this.listenersService.findAllWithMusicId();
  }

  findAllWithUserId(@Body() userId:string) {
    return this.listenersService.findAllWithUserId();
  }

}
