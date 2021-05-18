import { IAppState } from "@gitgrok/isomorphic";

export const appStateDefault: IAppState = {
  repos: [],
  error: null,
  upStream: [],
  downStream: [],
  detail: {}
};
