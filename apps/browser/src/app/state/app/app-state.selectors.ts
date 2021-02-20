import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from './app-state.interface';
import { appStateName } from './app-state.name';

const selectState = createFeatureSelector(appStateName);

export const getRepos = createSelector(
  selectState,
  (app: IAppState) => app.repos || []
);
