import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { SearchService } from '../services/search.service';

@Controller('search')
export class SearchController {
  logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) {}

  @Get('v2/:term')
  async v2(
    @Param() params: { term: string },
    @Query('pathFilter') pathFilter: string
  ) {
    return this.searchService.searchV2(params.term, pathFilter);
  }
}
