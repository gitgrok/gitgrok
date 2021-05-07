import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { initFinished } from '../app/app-state.actions';
import { getRepos } from '../app/app-state.selectors';
import {
  searchFinished,
  searchInitFinished,
  searchStarted,
} from './search-state.actions';

@Injectable()
export class SearchStateEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly searchService: SearchService,
    private readonly store: Store
  ) {}

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
