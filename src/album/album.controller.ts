import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Public } from 'src/authorization/decorators/public.decorator';
import { RoleEnum } from 'src/authorization/enums/roles.enum';
import { Roles } from 'src/authorization/decorators/roles.decorator';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Roles(RoleEnum.admin)
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }
  
  @Public()
  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }
  
  @Roles(RoleEnum.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
