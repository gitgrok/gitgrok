import { ActionReducer, createReducer, on } from '@ngrx/store';
import { cloneFinished, initFailed, initFinished, upStarted } from './app-state.actions';
import { appStateDefault } from './app-state.default';
import { IAppState } from './app-state.interface';

export const appStateReducer: ActionReducer<IAppState> = createReducer(
  appStateDefault,
  on(initFinished, (s, a) => ({ ...s, repos: a.repos })),
  on(initFailed, (s, a) => ({ ...s, error: a.error })),
  on(upStarted, (s, {props, tipo}) => ({...s, lee: [...s.lee, {props, tipo}]})),
  on(cloneFinished, (s, a) => ({ ...s, repos: [...s.repos, a.repo].sort() }))
);
