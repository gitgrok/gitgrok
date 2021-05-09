import { IAppState } from './app-state.interface';

export const appStateDefault: IAppState = {
  repos: [],
  error: null,
  upStream: [],
  downStream: []
};
