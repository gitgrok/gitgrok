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
import { EnvController, EnvModule } from '@onivoro/server-parameterization';
import { ServerGitModule } from '@onivoro/server-git';
import { resolve } from 'path';
import {ServerBrowserModule} from '@onivoro/server-browser';
import { AppService } from './app.service';

const env = [HomePath, ManifestPath, GitGrokPort];

@Module({
  imports: [
    ServerBrowserModule.forRoot({headless: false, defaultViewport: {width: 1800, height: 1000}, executablePath: process.env.CHROME_BIN}),
    ServerGitModule,
    EnvModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), 'dist/apps/browser')
    })
  ],
  controllers: [RepositoryController, SearchController, EnvController],
  providers: [
    ...env,
    RepositoryService,
    PathManager,
    ResultTransformer,
    SearchService,
    AppService
  ],
})
export class AppModule { }
