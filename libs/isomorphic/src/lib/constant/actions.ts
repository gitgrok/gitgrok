import { AppEvent } from '../enum/app-event.enum';
import { IIpcAction } from '../interfaces/ipc-action.interface';
import { failed, finished, started } from './stamps';

function props<T>() {
  return () => ({} as T)
};
function createAction<T>(type: string, p?: () => T) {
  const ac = (props?: T) => ({ ...p?.(), ...props, type });
  ac.type = type;
  return ac;
};
export const initStarted = createAction(started(AppEvent.INIT));
export const initFinished = createAction(
  finished(AppEvent.INIT),
  props<{ repos: any[] }>()
);
export const initFailed = createAction(
  failed(AppEvent.INIT),
  props<{ error: any }>()
);
export const openRepoStarted = createAction(
  started(AppEvent.OPEN_REPO),
  props<{ repo: string }>()
);
export const openRepoFinished = createAction(
  finished(AppEvent.OPEN_REPO),
  props<{ repo: string }>()
);
export const openRepoFailed = createAction(
  failed(AppEvent.OPEN_REPO),
  props<{ error: any }>()
);

export const openDirStarted = createAction(
  started(AppEvent.OPEN_DIR),
  props<{ dir: string }>()
);
export const openDirFinished = createAction(
  finished(AppEvent.OPEN_DIR),
  props<{ dir: string }>()
);
export const openDirFailed = createAction(
  failed(AppEvent.OPEN_DIR),
  props<{ error: any }>()
);

export const cloneStarted = createAction(
  started(AppEvent.CLONE),
  props<{ url: string }>()
);

export const cloneFinished = createAction(
  finished(AppEvent.CLONE),
  props<{ repo: any }>()
);
export const cloneFailed = createAction(
  failed(AppEvent.CLONE),
  props<{ error: any }>()
);

export const navStarted = createAction(started('NAV'), props<{label: string, slug: string}>());
export const upStarted = createAction(started(AppEvent.UP$), props<IIpcAction>());
export const upFinished = createAction(finished(AppEvent.UP$));
export const downStarted = createAction(started(AppEvent.DOWN$), props<IIpcAction>());
export const downFinished = createAction(finished(AppEvent.DOWN$));
