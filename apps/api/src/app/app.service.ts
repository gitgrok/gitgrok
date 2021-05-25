import { IAction } from '@arc/isomorphic';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { from, merge, Subject } from 'rxjs';
import { concatMap, concatMapTo, map, mergeMap, tap } from 'rxjs/operators';
import { ApiEffects } from './app.effects';
import { ServerAppVscxService } from '@onivoro/server-app-vscx';

@Injectable()
export class AppService implements OnApplicationShutdown {
  browser: any;
  page: any;
  constructor(
    private readonly vscx: ServerAppVscxService
  ) { }
  async onApplicationShutdown(signal?: string) {
    console.warn('closing browser', signal);
    await this.browser.close();
  }
  private readonly downStream$$ = new Subject<IAction>();
  private readonly actions$ = this.downStream$$.asObservable();

  initIpcChannel(url: string) {
    return this.vscx.getActions$$(url).pipe(
      map(() => new ApiEffects(this.actions$)),
      concatMap((fx) =>
        merge(fx.localstack$, fx.exec$$)
      ),
      tap((action) => console.log('upStream$$', action)),
      tap((action) =>
        from(
          this.page.evaluate(
            (detail) =>
              window.dispatchEvent(
                new CustomEvent('up', {
                  detail,
                })
              ),
            action
          )
        )
      )
    )
    // return from(this.browserService.createAppRuntime(url)).pipe(
    //   tap(({ page, browser }) => {
    //     this.browser = browser;
    //     this.page = page;
    //   }),
    //   concatMap(
    //     async ({ page }) =>
    //       await page.exposeFunction('down', (action: IAction) => {
    //         console.log('page.exposeFunction.down', action);
    //         this.downStream$$.next(action);
    //       })
    //   ),
    //   map(() => new ApiEffects(this.actions$)),
    //   concatMap((fx) =>
    //     merge(fx.localstack$, fx.exec$$)
    //   ),
    //   tap((action) => console.log('upStream$$', action)),
    //   tap((action) =>
    //     from(
    //       this.page.evaluate(
    //         (detail) =>
    //           window.dispatchEvent(
    //             new CustomEvent('up', {
    //               detail,
    //             })
    //           ),
    //         action
    //       )
    //     )
    //   )
    // );
  }
}
