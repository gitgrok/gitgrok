import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { RepoService } from '../../services/repo.service';
import {
  cloneFailed,
  cloneFinished,
  cloneStarted,
  initFailed,
  initFinished,
  initStarted,
  openDirStarted,
  openRepoFinished,
  openRepoStarted,
} from './app-state.actions';
// import { ApiService} from '../../api'
@Injectable()
export class AppStateEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly repoService: RepoService
  ) {}

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

  getBranchesForRepo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openRepoStarted),
      // concatMap(() => ApiService),
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
