import { up, down, globalName, AppEvent, detailRepoStarted, detailRepoFinished, IAction, localstackInitStarted, localstackInitFinished, localstackNavStarted } from '@gitgrok/isomorphic';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { BrowserService } from '@onivoro/server-browser';
import { from, BehaviorSubject, merge, Subject, of } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, tap } from 'rxjs/operators';
import { execRx } from '@onivoro/server-process';
import { RepositoryService } from './services/repository.service';
import { s3Prefix } from '@gitgrok/isomorphic';

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


  lsLocalStack$$ = (key: string) => { const cmd = `awslocal --endpoint-url=http://localhost:6654 s3 ls ${s3Prefix}${key}`; console.log(cmd); return execRx(cmd) };
  readonly localstack$ = this.actions$.pipe(
    // ofType(localstackInitStarted),
    filter(a => a.type === localstackInitStarted.type || a.type === localstackNavStarted.type),
    tap(a => console.log('localstack init started', a)),
    concatMap((action) => this.lsLocalStack$$((action as any).key).pipe(
      tap(output => console.log('ls output', output)),
      map(output => output.split('\n')?.map?.(l => l.trim())),
      catchError(e => {console.warn(e); return of(e)}),
      map((results) => ({ type: action.type.replace('START', 'FINISH'), results})),
      tap((d) => from(this.page.evaluate((detail) =>
        window.dispatchEvent(
          new CustomEvent('up', {
            detail
          })
        ), d
      )))
    )),

  );

  initIpcChannel(url: string) {
    return from(this.browserService.createAppRuntime(url))
      .pipe(
        tap(({ page, browser }) => {
          this.browser = browser;
          this.page = page;
        }),
        concatMap(async ({ page }) =>
          await (page.exposeFunction('down', (action: IAction) => {
            console.log('page.exposeFunction.down', action);
            this.downStream$$.next(action);
          })
          )),
        concatMap(() => this.localstack$),
      );
  };
}
