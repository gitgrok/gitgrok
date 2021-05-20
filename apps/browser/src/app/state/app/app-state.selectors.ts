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


export const getLocalStack = createSelector(
  selectState,
  (app: IAppState) => app.localstack
);


export const getLocalStackPwd = createSelector(
  selectState,
  (app: IAppState) => app.localstackPwd
);



export const getLocalStackContents = createSelector(
  getLocalStack,
  getLocalStackPwd,
  (ls, lsPwd) => ls[lsPwd]?.map(l => l?.replace?.(/PRE\W/g, ''))
);
