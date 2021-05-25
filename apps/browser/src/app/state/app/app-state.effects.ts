import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  tap,
} from 'rxjs/operators';
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
  upFinished,
  upStarted,
} from '@gitgrok/isomorphic';

@Injectable()
export class AppStateEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly repoService: RepoService,
    private readonly ipcActionService: IpcActionService
  ) {}

  autoDownStart$ = createEffect(() =>
    this.actions$.pipe(
      filter((a) => !!a?.type && !a.type.includes('$')),
      filter((a) => !((a as any).producer) || !((a as any).producer).includes('api')),
      tap((a) => console.log('autoDownStart$ true', a)),
      tap((a) => this.ipcActionService.dispatch(a)),
      map((action) => downStarted({ action }))
    )
  );

  autoUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(upStarted),
      tap((a) => console.log(a)),
      map(({ action }) => upFinished({ action }))
    )
  );

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
