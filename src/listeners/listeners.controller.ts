import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';

@Controller('listeners')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) { }

  @Post()
  create(@Body() createListenerDto: CreateListenerDto,@Req() req): any {
    console.log(req.user.id)
    return this.listenersService.create(createListenerDto, req.user.id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.listenersService.findOne(+id);

  // }
}