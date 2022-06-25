import { initStarted } from "@gitgrok/isomorphic";
import { Injectable } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";

export interface IAction {
  type: string;
}

@Injectable()
export class Store {
  private actions$$ = new BehaviorSubject<IAction[]>([]);
  private action$$ = new BehaviorSubject<IAction>(initStarted());
  actions$ = this.actions$$.asObservable();
  action$ = this.action$$.asObservable();

  dispatch (action: IAction) {
    this.actions$$.next([...this.actions$$.value, action]);
    this.action$$.next(action);
  }
}
