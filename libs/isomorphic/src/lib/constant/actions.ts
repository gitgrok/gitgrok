import { AppEvent } from '../enum/app-event.enum';
import {
  IAction, failed, finished, started, createAction, props
} from '@onivoro/server-app-vscx';

type money = { details: any, url: string };

export const localstackInitStarted = createAction(started(AppEvent.LOCALSTACK_INIT), props<{ key: string }>());
export const localstackInitFinished = createAction(finished(AppEvent.LOCALSTACK_INIT), props<{ results: string[] }>());

export const localstackNavStarted = createAction(started(AppEvent.LOCALSTACK_NAV), props<{ key: string }>());
export const localstackNavFinished = createAction(finished(AppEvent.LOCALSTACK_NAV), props<{ results: string[] }>());

export const execStarted = createAction(started(AppEvent.EXEC), props<{ cmd: string }>());
export const execFinished = createAction(finished(AppEvent.EXEC), props<{ cmd: string, results: any }>());
export const execFailed = createAction(failed(AppEvent.EXEC), props<{ cmd: string, err: any }>());

export const initStarted = createAction(started(AppEvent.INIT));
export const initFinished = createAction(
  finished(AppEvent.INIT),
  props<{ repos: any[] }>()
);
export const initFailed = createAction(
  failed(AppEvent.INIT),
  props<{ error: any }>()
);

export const navStarted = createAction(started('NAV'), props<{ label: string, slug: string }>());
export const upStarted = createAction(started(AppEvent.UP$), props<{ action: IAction }>());
export const upFinished = createAction(finished(AppEvent.UP$), props<{ action: IAction }>());
export const downStarted = createAction(started(AppEvent.DOWN$), props<{ action: IAction }>());
export const downFinished = createAction(finished(AppEvent.DOWN$));
