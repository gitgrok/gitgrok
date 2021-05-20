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
  page: any;
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

  readonly actions$ = this.downStream$$.asObservable().pipe(
    tap(lee => console.log('downStream$$', lee)),
    tap((a: IAction) => console.log('actions$', a)),
  );

  readonly detailRepoStarted$ = this.actions$.pipe(
    ofType(detailRepoStarted),
    tap(a => console.log('detailRepoStarted', a)),
    // map((a) => ({ url: 'blah', details: { comoes: 'detallado' }, a })),
    concatMap(({ url }) => this.repoSvc.get(url).pipe(map(details => ({ details, url }), catchError(e => of({ url, details: e }))))),
    filter(({ details }) => !!details),
    tap(details => console.log('deeeets', details, typeof details?.details)),
    map(({ url, details }) => detailRepoFinished({ url, details })),
    // map(a => JSON.stringify(a)),
    tap(a => console.log('sending', a)),
    tap((d) => from(this.page.evaluate((detail) =>
    window.dispatchEvent(
      new CustomEvent('up', {
        detail
      })
    ), d
  )))

  );

  initIpcChannel(url: string) {    
    return from(this.browserService.createAppRuntime(url))
      .pipe(
        tap(({ page, browser }) => {
          this.browser = browser;
          this.page = page;
        }),
        concatMap(async ({page}) => 
          await (page.exposeFunction('down', (action: IAction) => {
            console.log('exposed', action);
            this.downStream$$.next(action);
          })
        )),
        concatMap(() => this.detailRepoStarted$),
      );
  };
}
