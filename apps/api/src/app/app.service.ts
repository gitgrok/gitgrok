import { up, down } from '@gitgrok/isomorphic';
import { Injectable } from '@nestjs/common';
import { BrowserService } from '@onivoro/server-browser';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class AppService {
  constructor(private readonly browserService: BrowserService) { }

  async serve(browserPort: number) {
    const url = `http://localhost:${browserPort}`;
    const { ipc, page } = await this.browserService.createAppRuntime(url);
    (ipc as any).on(down, (data) => {
      writeFileSync(resolve(process.cwd(), `${down}-${new Date().toISOString()}.txt`), `${JSON.stringify(data, null, 2)}`, { encoding: 'utf-8' });
    });
    await page.evaluate(`
const { IPC } = window['puppeteer-ipc/browser'];
const ipc = new IPC();

ipc.on('${up}', (d) => {
    ipc.send('${down}', d);
  window.alert(d);
});`
    );
    await ipc.send(up, 'gitgrok-from-server-to-browser');
  };
}
