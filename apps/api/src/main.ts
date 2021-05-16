import { ports } from '../../../ports';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.enableCors();
  const { api } = ports;
  try {
    await app.listen(api);
  } catch (e) {
    console.warn(e);
  }
  await app.get(AppService).initIpcChannel(4321).toPromise();
}

bootstrap();
