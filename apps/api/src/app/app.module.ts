import { Module, OnModuleInit } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

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
import { EnvModule } from '@onivoro/server-parameterization';
import { ServerGitModule } from '@onivoro/server-git';
import { resolve } from 'path';

const env = [HomePath, ManifestPath, GitGrokPort];

@Module({
  imports: [
    ServerGitModule,
    EnvModule,
    ServeStaticModule.forRoot({
      // rootPath: resolve(process.cwd(), 'dist/apps/browser'),
      rootPath: resolve('/Users/lee.norris/github.com/gitgrok/gitgrok/apps/kit/build'),
    }),
  ],
  controllers: [RepositoryController, SearchController],
  providers: [
    ...env,
    RepositoryService,
    PathManager,
    ResultTransformer,
    SearchService,
  ],
})
export class AppModule {}
