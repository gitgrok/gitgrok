import { Module, OnModuleInit } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { ServerBrowserModule } from '@onivoro/server-browser';
import { AppService } from './app.service';
import { ServerAppVscxModule } from '@onivoro/server-app-vscx';

@Module({
  imports: [
    ServerAppVscxModule,
    // ServerBrowserModule.forRoot({
    //   headless: false,
    //   defaultViewport: { width: 1800, height: 1000 },
    //   executablePath: process.env.CHROME_BIN,
    // }),
    // ServeStaticModule.forRoot({
    //   rootPath: resolve(process.cwd(), 'dist/apps/browser'),
    // }),
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
