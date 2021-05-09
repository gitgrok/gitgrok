/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { ports } from '../../../ports';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { swagOn } from './swag-on';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  await swagOn(app);
  const port = ports.api;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
