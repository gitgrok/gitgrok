import { up, down, globalName, IIpcAction, AppEvent } from '@gitgrok/isomorphic';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { BrowserService } from '@onivoro/server-browser';
import { from, BehaviorSubject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Injectable()
export class AppService implements OnApplicationShutdown {
  browser: any;
  constructor(private readonly browserService: BrowserService) { }
  async onApplicationShutdown(signal?: string) {
    console.warn('closing browser');
    await this.browser.close();
  }
  private readonly downStream$$ = new BehaviorSubject<IIpcAction>({
    actionType: AppService.name,
    actionProps: Object.keys(this)
  });
  private _ipc: any;

  readonly downStream$ = this.downStream$$.asObservable().pipe(
    tap(lee => console.log('server receiver downstream', lee)),
    concatMap((a) => this._ipc.send(up, a))
  );

  initIpcChannel(url: string) {    

    return from(this.browserService.createAppRuntime(url))
      .pipe(
        tap(({ browser }) => { 
          this.browser = browser;
        }),
        tap(({ ipc }) => {
          this._ipc = ipc;
          (ipc as any).on(down, (msg: any) => this.downStream$$.next(msg));
        }),
        concatMap(({ page }) => from(page.evaluate(`
const { IPC } = window['puppeteer-ipc/browser'];
const ipc = new IPC();
window['${globalName}'] = ipc;
ipc.send('${down}', {actionType: '${AppEvent.INIT}', actionProps: {start: new Date().toISOString()}});
ipc.on('${up}', (detail) => {  
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

