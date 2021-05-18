import { up, down, globalName, IIpcAction, AppEvent, detailRepoStarted } from '@gitgrok/isomorphic';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { BrowserService } from '@onivoro/server-browser';
import { from, BehaviorSubject, merge, Subject } from 'rxjs';
import { concatMap, filter, map, mergeMap, tap } from 'rxjs/operators';

// function ofType({ type }: { type: string }) {
//   return filter((a) => {
//     console.log('akshun', a, 'type', type);
//     return true;
//   })
// }

@Injectable()
export class AppService implements OnApplicationShutdown {
  browser: any;
  constructor(private readonly browserService: BrowserService) { }
  async onApplicationShutdown(signal?: string) {
    console.warn('closing browser');
    await this.browser.close();
  }
  private readonly downStream$$ = new BehaviorSubject<IIpcAction>(
    {
    actionType: AppService.name,
    actionProps: Object.keys(this)
  }
  );
  private _ipc: any;

  readonly actions$ = this.downStream$$.asObservable().pipe(
    tap(lee => console.log('server receiver downstream', lee)),
    // map(({ actionType, actionProps }) => ({ ...actionProps, type: actionType })),
    // concatMap((a) => this._ipc.send(up, a))
  );

  readonly detailRepoStarted$ = this.actions$.pipe(
    tap(a => console.log('ax', a)),
    // ofType(detailRepoStarted),
  );

  initIpcChannel(url: string) {

    this.detailRepoStarted$.subscribe();

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
      );
  };
}

