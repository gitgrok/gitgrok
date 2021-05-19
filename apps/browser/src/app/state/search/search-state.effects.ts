import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import {
  downStarted, initFinished, upStarted, searchFinished,
  searchInitFinished,
  searchStarted
} from '@gitgrok/isomorphic';
import { getRepos } from '../app/app-state.selectors';

@Injectable()
export class SearchStateEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly searchService: SearchService,
    private readonly store: Store
  ) { }

  autoDown$ = createEffect(() => this.actions$.pipe(
    tap(a => console.log(a)),
    filter(a => a.type !== downStarted.type),
    filter(a => a.type !== upStarted.type),
    map(({ type, ...rest }) => downStarted({ actionType: type, actionProps: rest }))
  ));

  autoUp$ = createEffect(() => this.actions$.pipe(
    ofType(upStarted),
    map(({ actionProps, type: actionType }) => ({ ...actionProps, type: actionType }))
  ));


  executeSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchStarted),
      switchMap(({ query, pathFilter }) =>
        this.searchService.getV2(query, pathFilter)
      ),
      map((results) => searchFinished({ results }))
    )
  );

  setSelectedRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initFinished),
      withLatestFrom(this.store.select(getRepos)),
      map(([, repos]) => searchInitFinished({ repos }))
    )
  );
}
