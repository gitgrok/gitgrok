import { ActionReducer, createReducer, on } from '@ngrx/store';
import {
  ISearchState,
  repoDeselected,
  repoSelected,
  searchFinished,
  searchInitFinished,
  searchStarted,
} from '@gitgrok/isomorphic';
import { searchStateDefault } from './search-state.default';

export const searchStateReducer: ActionReducer<ISearchState> = createReducer(
  searchStateDefault,
  on(searchStarted, (state: ISearchState, { query }) => ({ ...state, query })),
  on(searchFinished, (state: ISearchState, { results }) => ({
    ...state,
    results,
  })),
  on(searchInitFinished, (state: ISearchState, { repos }) => ({
    ...state,
    repos,
  })),
  on(repoSelected, (state: ISearchState, { repo }) => ({
    ...state,
    repos: [...state.repos, repo],
  })),
  on(repoDeselected, (state: ISearchState, { repo }) => ({
    ...state,
    repos: state.repos.filter((r) => r !== repo),
  }))
);
