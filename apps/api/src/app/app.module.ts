import { Module } from '@nestjs/common';

import {
  GitGrokPort,
  HomePath,
  ManifestPath,
} from './config/gitgrok-server.config';
import { RepositoryController } from './controllers/repository.controller';
import { RepositoryService } from './services/repository.service';
import { PathManager } from './services/path-manager';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';
import { ResultTransformer } from './services/result-transformer';
import { EnvController, EnvModule } from '@onivoro/server-parameterization';
import { ServerGitModule } from '@onivoro/server-git';

const env = [HomePath, ManifestPath, GitGrokPort];

@Module({
  imports: [ServerGitModule, EnvModule],
  controllers: [RepositoryController, SearchController, EnvController],
  providers: [
    ...env,
    RepositoryService,
    PathManager,
    ResultTransformer,
    SearchService,
  ],
})
export class AppModule {}
