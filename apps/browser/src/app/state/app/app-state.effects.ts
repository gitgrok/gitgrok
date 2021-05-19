import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, filter, map, tap } from 'rxjs/operators';
import { IpcActionService } from '../../services/ipc-action.service';
import { RepoService } from '../../services/repo.service';
import {
  cloneFailed,
  cloneFinished,
  cloneStarted,
  downStarted,
  initFailed,
  initFinished,
  initStarted,
  openDirStarted,
  openRepoFinished,
  openRepoStarted,
} from '@gitgrok/isomorphic';

@Injectable()
export class AppStateEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly repoService: RepoService,
    private readonly ipcActionService: IpcActionService
  ) { }

  autoDownStart$ = createEffect(() => this.actions$.pipe(  
    tap(a => console.log('autoDownStart$ ?', a)),  
    filter(a => !(JSON.stringify(a)).includes('$')),
    tap(a => console.log('autoDownStart$ true', a)),  
    filter(() => !!(window as any).GITGROK),
    tap((a) => this.ipcActionService.dispatch(a)),
    map((action) => downStarted(({action})))
  ));

  // autoDownEnd$ = createEffect(() => this.actions$.pipe(
  //   tap(a => console.log('autoDownEnd$', a)),  
  //   filter(a => a.type === downStarted.type),
  //   filter(() => !!(window as any).GITGROK),
  //   tap((a) => this.ipcActionService.dispatch(a)),
  //   map(({ type, ...rest }) => downFinished({ actionType: type, actionProps: rest }))
  // ));

  // autoUp$ = createEffect(() => this.actions$.pipe(
  //   tap(a => console.log(a)),
  //   ofType(upStarted),
  //   tap(a => console.log(a)),
  //   map(({ actionProps }) => upFinished({}))
  // ));

  getRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initStarted),
      exhaustMap(() => this.repoService.getRepos()),
      map((repos) => initFinished({ repos } as any)),
      catchError((e) => of(e).pipe(map((error) => initFailed({ error }))))
    )
  );

  cloneRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cloneStarted),
      exhaustMap(({ url }) =>
        this.repoService.trackRepo(url).pipe(map(() => url))
      ),
      map((repo) => cloneFinished({ repo })),
      catchError((e) => of(e).pipe(map((error) => cloneFailed({ error }))))
    )
  );

  openRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openRepoStarted),
      map(({ repo }) => openRepoFinished({ repo }))
    )
  );

  openDir$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openDirStarted),
      concatMap(({ dir }) =>
        this.repoService.openDir(dir).pipe(map(() => dir))
      ),
      map((repo: string) => openRepoFinished({ repo }))
    )
  );
}
