import { ISearchState } from '@arc/isomorphic';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { searchStateName } from './search-state.name';

const selectState = createFeatureSelector(searchStateName);

export const getQuery = createSelector(
  selectState,
  (search: ISearchState) => search.query || 'no query yet'
);

export const getResults = createSelector(
  selectState,
  (search: ISearchState) => search.results || []
);

export const getSelectedRepos = createSelector(
  selectState,
  (search: ISearchState) =>
    (search.repos || []).map((r) => r.replace('.git', ''))
);
