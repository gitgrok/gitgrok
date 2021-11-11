import { Body, Controller, Get, Put, Logger, Param } from '@nestjs/common';
import { RepositoryService } from '../services/repository.service';

export class Dto {
  url: string;
}
@Controller('repos')
export class RepositoryController {
  logger = new Logger(RepositoryController.name);

  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  async list() {
    return this.repositoryService.list().toPromise();
  }

  @Get(':url/branches')
  async branches(@Param() url: string) {
    return await this.repositoryService.get(url).toPromise();
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
    console.warn('body', body)
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
