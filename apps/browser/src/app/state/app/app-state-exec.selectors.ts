import { IAppState } from '@arc/isomorphic';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appStateName } from './app-state.name';

const selectState = createFeatureSelector(appStateName);

export const getCmds = createSelector(
  selectState,
  (app: IAppState) => app.cmds
);
