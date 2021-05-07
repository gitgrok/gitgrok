import { createAction, props } from '@ngrx/store';
import { AppEvent } from '@gitgrok/isomorphic';
import { failed, finished, started } from '../lib';
import { ISearchState } from './search-state.interface';
const SEARCH_INIT = 'SEARCH_INIT';

export const searchInitStarted = createAction(started(SEARCH_INIT));
export const searchInitFinished = createAction(
  finished(SEARCH_INIT),
  props<{ repos: ISearchState['repos'] }>()
);
export const searchInitFailed = createAction(
  failed(SEARCH_INIT),
  props<{ error: any }>()
);
export const searchStarted = createAction(
  started(AppEvent.SEARCH),
  props<{
    query: ISearchState['query'];
    repos: ISearchState['repos'];
    pathFilter: ISearchState['pathFilter'];
  }>()
);
export const searchFinished = createAction(
  finished(AppEvent.SEARCH),
  props<{ results: ISearchState['results'] }>()
);
export const searchFailed = createAction(failed(AppEvent.SEARCH));

export const allReposSelected = createAction(`ALL_REPOS_SELECTED`);
export const repoSelected = createAction(
  `REPO_SELECTED`,
  props<{ repo: string }>()
);
export const repoDeselected = createAction(
  `REPO_DESELECTED`,
  props<{ repo: string }>()
);
