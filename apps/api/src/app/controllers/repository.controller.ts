import { Body, Controller, Get, Put, Logger, Param } from '@nestjs/common';
import { RepositoryService } from '../services/repository.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
export class Dto {
  url: string;
}
const prefix = 'repos';
@ApiTags(prefix)
@Controller(prefix)
export class RepositoryController {
  prefix = prefix;
  logger = new Logger(RepositoryController.name);

  constructor(private readonly repositoryService: RepositoryService) {}

  @ApiOkResponse({isArray: true, type: 'string'})
  @Get()
  async list() {
    return this.repositoryService.list().toPromise();
  }

  @Get(':url/branches')
  async branches(@Param() url: string) {
    return await this.repositoryService.getReferencesForRepoUrl(url);
  }

  @Get(':url/open-repo')
  async openRepo(@Param() url: string) {
    return await this.repositoryService.openRepo(url).toPromise();
  }

  @Put('open-dir')
  async openDir(@Body() dto: Dto) {
    return await this.repositoryService.openDir(dto.url).toPromise();
  }

  @Put()
  async track(@Body() body: Dto) {
    return await this.repositoryService
      .track(body.url)
      .toPromise()
      .then(() => {
        this.logger.log('success');
      })
      .catch((e) => {
        this.logger.warn(e);
      });
  }
}
