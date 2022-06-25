import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { initOpenapi } from './init-openapi';

import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();
  const port = process.env.GITGROK_PORT;
  await initOpenapi(app);
  await app.listen(port);
  Logger.log(
    `🚀 http://localhost:${port}`
  );
}

bootstrap();
