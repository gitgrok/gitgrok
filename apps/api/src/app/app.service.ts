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

  initIpcChannel(assetPort: number) {
    const url = `http://localhost:${assetPort}`;
    // const { ipc, page } = 
    return from(this.browserService.createAppRuntime(url))
      .pipe(
        tap(({ ipc }) => {
          this._ipc = ipc;
          (ipc as any).on(down, (msg: any) => this.actions$$.next(msg));
        }),
        concatMap(({ page }) => from(page.evaluate(`
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
        ))),
        concatMap(() => this._ipc.send(up, { type: up, hotsauce: 'on-erythng' }))
      );    
  };
}
