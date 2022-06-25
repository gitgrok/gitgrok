import { Body, Controller, Get, Put, Logger, Param } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UrlDto } from '../dtos/url.dto';
import { RepositoryService } from '../services/repository.service';

const prefix = 'repos';
@ApiTags(prefix)
@Controller(prefix)
export class RepositoryController {
  logger = new Logger(RepositoryController.name);

  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  async list() {
    return this.repositoryService.list().toPromise();
  }

  @Get(':url/branches')
  async branches(@Param('url') url: string) {
    return await this.repositoryService.listBranches(url).toPromise();
  }

  @Get(':url/details')
  details(@Param('url') url: string) {
    return this.repositoryService.getDetail(url);
  }

  @Get(':url/open-repo')
  async openRepo(@Param('url') url: string) {
    return await this.repositoryService.openRepo(url).toPromise();
  }

  @Put('open-dir')
  async openDir(@Body() dto: UrlDto) {
    return await this.repositoryService.openDir(dto.url).toPromise();
  }

  @Put()
  async track(@Body() body: UrlDto) {
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
