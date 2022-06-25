import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchDto } from '../dtos/search.dto';
import { SearchService } from '../services/search.service';

const prefix = 'search';
@ApiTags(prefix)
@Controller(prefix)
export class SearchController {
  logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) { }

  @Get('v2/:term')
  async v2(
    @Param('term') term: string,
    @Query('pathFilter') pathFilter: string
  ) {
    return this.searchService.searchV2(term, pathFilter);
  }

  @Post()
  async search(
    @Body() {term, path}: SearchDto,
  ) {
    return this.searchService.searchV2(term, path);
  }
}
