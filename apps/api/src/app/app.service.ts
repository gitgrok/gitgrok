import { IAction } from '@gitgrok/isomorphic';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { BrowserService } from '@onivoro/server-browser';
import { from, Subject, } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { RepositoryService } from './services/repository.service';
import { AppEffects } from './app.effects';


@Injectable()
export class AppService implements OnApplicationShutdown {
  browser: any;
  page: any;
  constructor(private readonly browserService: BrowserService, private readonly repoSvc: RepositoryService) { }
  async onApplicationShutdown(signal?: string) {
    console.warn('closing browser');
    await this.browser.close();
  }
  private readonly downStream$$ = new Subject<IAction>();

  readonly actions$ = this.downStream$$.asObservable().pipe(
    tap(lee => console.log('downStream$$', lee)),
    tap((a: IAction) => console.log('actions$', a)),
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
        map(() => new AppEffects(this.repoSvc, this.actions$)),
        concatMap((fx) => fx.localstack$), // all fx need merged here
        tap((action) => from(this.page.evaluate((detail) =>
          window.dispatchEvent(
            new CustomEvent('up', {
              detail
            })
          ), action
        )))
      );
  };
}
