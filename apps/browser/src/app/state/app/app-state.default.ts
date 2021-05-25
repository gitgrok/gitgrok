import { IAppState } from '@arc/isomorphic';

export const appStateDefault: IAppState = {
  error: null,
  upStream: [],
  downStream: [],
  detail: {},
  localstack: {},
  localstackPwd: '',
  cmds: {},
};
