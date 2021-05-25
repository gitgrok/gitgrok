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
  downStarted,
  initFailed,
  initFinished,
  initStarted,
  upFinished,
  upStarted,
} from '@arc/isomorphic';

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
}
