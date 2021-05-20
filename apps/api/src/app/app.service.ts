import { up, down, globalName, AppEvent, detailRepoStarted, detailRepoFinished, IAction } from '@gitgrok/isomorphic';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { BrowserService } from '@onivoro/server-browser';
import { from, BehaviorSubject, merge, Subject, of } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, tap } from 'rxjs/operators';
import { execRx } from '@onivoro/server-process';
import { RepositoryService } from './services/repository.service';

function ofType({ type }: { type: string }) {
  return filter((a) => {
    console.log('ofType', a, 'type', type);
    return (a as any).type === type;
  })
}

@Injectable()
export class AppService implements OnApplicationShutdown {
  browser: any;
  constructor(private readonly browserService: BrowserService, private readonly repoSvc: RepositoryService) { }
  async onApplicationShutdown(signal?: string) {
    console.warn('closing browser');
    await this.browser.close();
  }
  private readonly downStream$$ = new Subject<IAction>(
  //   {
  //   actionType: AppService.name,
  //   actionProps: Object.keys(this)
  // }
  );
  private _ipc: any;

  readonly actions$ = this.downStream$$.asObservable().pipe(
    tap(lee => console.log('downStream$$', lee)),
    // map((action: IAction) => ipcActionToAction(ipcAction)),
    tap((a: IAction) => console.log('actions$', a)),
    // concatMap((a) => this._ipc.send(up, a))
  );

  readonly detailRepoStarted$ = this.actions$.pipe(
    ofType(detailRepoStarted),
    tap(a => console.log('detailRepoStarted', a)),
    map((a) => ({url: 'blah', detail: 'detallado', a})),
    // concatMap(({url}) => this.repoSvc.get(url).pipe(map(detail => ({detail, url}), catchError(e => of({url, detail: e}))))),
    map(({url, detail}) => detailRepoFinished({url, detail})),
    tap(a => console.log('sending', a)),
    tap((action) => this._ipc.send(up, action))
    // tap(({type, ...actionProps}) => this._ipc.send(up, {...actionProps, type}))
  );

  initIpcChannel(url: string) {of

    // this.detailRepoStarted$.pipe().subscribe();

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
console.warn(ipc)
window.onerror = function(message, source, lineno, colno, error) {
  console.warn(message, source, lineno, colno, error)
}
ipc.on('${up}', (detail) => {  
    console.warn('up', detail);
    window.dispatchEvent(
      new CustomEvent('${up}', {
        detail: detail,
      })
    );
});`
        ))),        
        concatMap(() => this.detailRepoStarted$),            
      );
  };
}

