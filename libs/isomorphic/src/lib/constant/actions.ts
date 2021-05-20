import { AppEvent } from '../enum/app-event.enum';
import { IAction } from '../interfaces/action.interface';
import { ISearchState } from '../interfaces/search-state.interface';
import { failed, finished, started } from './stamps';

const SEARCH_INIT = 'SEARCH_INIT';

type money = { details: any, url: string };

function props<T>() {
  return () => ({} as T)
};
function createAction<T>(type: string, p?: () => T) {
  const ac = (props?: T) => ({ ...p?.(), ...props, type });
  ac.type = type;
  return ac;
};
export const localstackInitStarted = createAction(started(AppEvent.LOCALSTACK), props<{key: string}>());
export const localstackInitFinished = createAction(finished(AppEvent.LOCALSTACK), props<{results: string[], key: string}>());

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

export const initStarted = createAction(started(AppEvent.INIT));
export const initFinished = createAction(
  finished(AppEvent.INIT),
  props<{ repos: any[] }>()
);
export const initFailed = createAction(
  failed(AppEvent.INIT),
  props<{ error: any }>()
);
export const openRepoStarted = createAction(
  started(AppEvent.OPEN_REPO),
  props<{ repo: string }>()
);
export const openRepoFinished = createAction(
  finished(AppEvent.OPEN_REPO),
  props<{ repo: string }>()
);
export const openRepoFailed = createAction(
  failed(AppEvent.OPEN_REPO),
  props<{ error: any }>()
);

export const openDirStarted = createAction(
  started(AppEvent.OPEN_DIR),
  props<{ dir: string }>()
);
export const openDirFinished = createAction(
  finished(AppEvent.OPEN_DIR),
  props<{ dir: string }>()
);
export const openDirFailed = createAction(
  failed(AppEvent.OPEN_DIR),
  props<{ error: any }>()
);

export const cloneStarted = createAction(
  started(AppEvent.CLONE),
  props<{ url: string }>()
);

export const cloneFinished = createAction(
  finished(AppEvent.CLONE),
  props<{ repo: any }>()
);
export const cloneFailed = createAction(
  failed(AppEvent.CLONE),
  props<{ error: any }>()
);

export const navStarted = createAction(started('NAV'), props<{ label: string, slug: string }>());
export const upStarted = createAction(started(AppEvent.UP$), props<{ action: IAction }>());
export const upFinished = createAction(finished(AppEvent.UP$));
export const downStarted = createAction(started(AppEvent.DOWN$), props<{ action: IAction }>());
export const downFinished = createAction(finished(AppEvent.DOWN$));

export const detailRepoStarted = createAction(started(AppEvent.DETAIL_REPO), props<{ url: string }>());
export const detailRepoFinished = createAction(finished(AppEvent.DETAIL_REPO), props<money>());
