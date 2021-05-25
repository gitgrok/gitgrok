import { ActionReducer, createReducer, on } from '@ngrx/store';
import {
  cloneFinished,
  detailRepoFinished,
  downStarted,
  execFinished,
  execStarted,
  IAppState,
  initFailed,
  initFinished,
  initStarted,
  localstackInitFinished,
  localstackInitStarted,
  localstackNavFinished,
  localstackNavStarted,
  upFinished,
  upStarted,
} from '@arc/isomorphic';
import { appStateDefault } from './app-state.default';

export const appStateReducer: ActionReducer<IAppState> = createReducer(
  appStateDefault,
  on(initStarted, (s, a) => ({ ...s, repos: [] })),
  on(initFinished, (s, a) => ({ ...s, repos: a.repos })),
  on(execStarted, (s, a) => ({ ...s, cmds: { ...s.cmds, [a.cmd]: null } })),
  on(execFinished, (s, { cmd, results }) => ({
    ...s,
    cmds: { ...s.cmds, [cmd]: results },
  })),
  on(initFailed, (s, a) => ({ ...s, error: a.error })),
  on(upStarted, (s, a) => ({ ...s, upStream: [...s.upStream, a] })),
  on(upFinished, (s, a) => ({ ...s, upStream: [...s.upStream, a] })),
  on(downStarted, (s, a) => ({ ...s, downStream: [...s.downStream, a] })),
  on(cloneFinished, (s, a) => ({ ...s, repos: [...s.repos, a.repo].sort() })),
  on(detailRepoFinished, (s, { details, url }) => ({
    ...s,
    detail: { ...s.detail, [url]: details },
  })),
  // on(localstackNavStarted, (s, { key }) => ({ ...s, localstackPwd: (s.localstackPwd + '/' + key).replace('//', '/') })),
  on(localstackNavStarted, (s, { key }) => ({
    ...s,
    localstackPwd: key.replace('//', '/'),
  })),
  on(localstackNavFinished, (s, { results }) => ({
    ...s,
    localstack: { ...s.localstack, results },
  })),
  on(localstackInitStarted, (s, { key }) => ({ ...s, localstackPwd: key })),
  on(localstackInitFinished, (s, { results }) => {
    console.log(new Date().toDateString());
    return { ...s, localstack: { ...s.localstack, results } };
  })
);
