import { up, down } from '@gitgrok/isomorphic';
import { Injectable } from '@nestjs/common';
import { BrowserService } from '@onivoro/server-browser';
import { from, BehaviorSubject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly browserService: BrowserService) { }
  private readonly downStream$$ = new BehaviorSubject({});
  private _ipc: any;

  readonly downStream$ = this.downStream$$.asObservable().pipe(
    concatMap((a) => this._ipc.send(up, a))
  );

  initIpcChannel(assetPort: number) {
    const url = `http://localhost:${assetPort}`;

    return from(this.browserService.createAppRuntime(url))
      .pipe(
        tap(({ ipc }) => {
          this._ipc = ipc;
          (ipc as any).on(down, (msg: any) => this.downStream$$.next(msg));
        }),
        concatMap(({ page }) => from(page.evaluate(`
const { IPC } = window['puppeteer-ipc/browser'];
const ipc = new IPC();

ipc.on('${up}', (detail) => {
    console.warn(detail);        

    window.dispatchEvent(
      new CustomEvent('${up}', {
        detail: detail,
      })
    );
});`
        ))),
        concatMap(() => this.downStream$$.asObservable().pipe(
          concatMap((a) => from(this._ipc.send(up, a)))
        )),
        concatMap(() => this._ipc.send(up, { actionType: up, hotsauce: 'on-erythng' }))
      );
  };
}
