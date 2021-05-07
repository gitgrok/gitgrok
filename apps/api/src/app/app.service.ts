import { up, down } from '@gitgrok/isomorphic';
import { Injectable } from '@nestjs/common';
import { BrowserService } from '@onivoro/server-browser';
import { from, BehaviorSubject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly browserService: BrowserService) { }
  private readonly actions$$ = new BehaviorSubject({});
  private _ipc: any;

  readonly actions$ = this.actions$$.asObservable().pipe(
    concatMap((a) => this._ipc.send(up, a))
  );

  async initIpcChannel(browserPort: number) {
    const url = `http://localhost:${browserPort}`;
    const { ipc, page } = await this.browserService.createAppRuntime(url);
    this._ipc = ipc;

    (ipc as any).once(down, (msg: any) => this.actions$$.next(msg));
    // (ipc as any).once(down, (msg: any) => this._ipc.send(up, msg));

    await page.evaluate(`
const { IPC } = window['puppeteer-ipc/browser'];
const ipc = new IPC();

ipc.on('${up}', (detail) => {
    console.warn(detail);        

    window.dispatchEvent(
      new CustomEvent('${up}', {
        detail,
      })
    );

});`
    );
    await ipc.send(up, 'gitgrok-from-server-to-browser');
    return this.actions$;
  };
}
