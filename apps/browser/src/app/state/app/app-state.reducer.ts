import { ActionReducer, createReducer, on } from '@ngrx/store';
import { cloneFinished, downStarted, initFailed, initFinished, upStarted } from './app-state.actions';
import { appStateDefault } from './app-state.default';
import { IAppState } from './app-state.interface';

export const appStateReducer: ActionReducer<IAppState> = createReducer(
  appStateDefault,
  on(initFinished, (s, a) => ({ ...s, repos: a.repos })),
  on(initFailed, (s, a) => ({ ...s, error: a.error })),
  on(upStarted, (s, a) => ({...s, upStream: [...s.upStream, a]})),
  on(downStarted, (s, a) => ({...s, downStream: [...s.downStream, a]})),
  on(cloneFinished, (s, a) => ({ ...s, repos: [...s.repos, a.repo].sort() }))
);
