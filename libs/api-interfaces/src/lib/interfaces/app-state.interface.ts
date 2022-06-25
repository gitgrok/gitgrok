export interface IAppState {
  repos: any[];
  error: any;
  upStream: any[];
  downStream: any[];
  detail: any;
  localstack: any;
  localstackPwd: string;
  cmds: {[cmd: string]: any}
}
