import { ports } from '../../../ports';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const { api } = ports;
  await app.listen(api);
  await app.get(AppService).initIpcChannel(4321).toPromise();
}

bootstrap();
