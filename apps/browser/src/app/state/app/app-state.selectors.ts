import { IAppState } from '@gitgrok/isomorphic';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appStateName } from './app-state.name';

const selectState = createFeatureSelector(appStateName);

export const getRepos = createSelector(
  selectState,
  (app: IAppState) => app.repos || []
);

export const getDetail = createSelector(
  selectState,
  (app: IAppState) => app.detail || { no: 'details' }
);
