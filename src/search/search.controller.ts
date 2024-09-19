import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { Public } from 'src/authorization/decorators/public.decorator';

@Public()
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Get()
  findAll(@Query() data: CreateSearchDto) {
    return this.searchService.findAll(data);
  }
}
