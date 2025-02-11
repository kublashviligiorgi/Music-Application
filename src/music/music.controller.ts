import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Public } from 'src/authorization/decorators/public.decorator';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { RoleEnum } from 'src/authorization/enums/roles.enum';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}
  
  @Roles(RoleEnum.admin)
  @Post()
  create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicService.create(createMusicDto);
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(+id);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(+id, updateMusicDto);
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(+id);
  }
}
