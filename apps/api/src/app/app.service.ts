import { up, down, globalName, IIpcAction } from '@gitgrok/isomorphic';
import { Injectable } from '@nestjs/common';
import { BrowserService } from '@onivoro/server-browser';
import { from, BehaviorSubject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly browserService: BrowserService) { }
  private readonly downStream$$ = new BehaviorSubject<IIpcAction>({
    actionType: AppService.name,
    actionProps: Object.keys(this)
  });
  private _ipc: any;

  readonly downStream$ = this.downStream$$.asObservable().pipe(
    tap(lee => console.log('server receiver downstream', lee)),
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
window['${globalName}'] = ipc;
ipc.send('${down}', {actionType: '${down}', actionProps: {coffee: 'black'}});
ipc.on('${up}', (detail) => {
    console.warn(detail);        

    window.dispatchEvent(
      new CustomEvent('${up}', {
        detail: detail,
      })
    );
});`
        ))),
        concatMap(() => this.downStream$),        
      );
  };
}

