import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, filter, map, tap } from 'rxjs/operators';
import { ActionService } from '../../services/action.service';
import { RepoService } from '../../services/repo.service';
import {
  cloneFailed,
  cloneFinished,
  cloneStarted,
  downFinished,
  downStarted,
  initFailed,
  initFinished,
  initStarted,
  openDirStarted,
  openRepoFinished,
  openRepoStarted,
  upStarted,
} from '@gitgrok/isomorphic';

@Injectable()
export class AppStateEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly repoService: RepoService,
    private readonly actionService: ActionService
  ) { }

  autoDownStart$ = createEffect(() => this.actions$.pipe(
    filter(a => a.type !== downStarted.type),
    filter(a => a.type !== upStarted.type),
    map(({ type, ...rest }) => downStarted({ actionType: type, actionProps: rest }))
  ));

  autoDownEnd$ = createEffect(() => this.actions$.pipe(
    filter(a => a.type === downStarted.type),
    filter(() => !!(window as any).GITGROK),
    tap((a) => this.actionService.dispatch(a)),
    map(({ type, ...rest }) => downFinished({ actionType: type, actionProps: rest }))
  ));

  autoUp$ = createEffect(() => this.actions$.pipe(
    tap(a => console.log(a)),
    ofType(upStarted),
    tap(a => console.log(a)),
    map(({ actionProps }) => ({ ...actionProps, type: actionProps.type }))
  ));

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
