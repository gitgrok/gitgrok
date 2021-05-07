import { ports } from '../../../ports';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const { api } = ports;
  await app.listen(api, () => Logger.log('http://localhost:' + api));
  app.get(AppService).serve(api);
}

bootstrap();
