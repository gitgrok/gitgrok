import { Injectable } from '@angular/core';
import { down, globalName, IIpcAction } from '@gitgrok/isomorphic';

@Injectable({ providedIn: 'root' })
export class IpcProvider {
  private _ipc: any;

  get ipc() {
    return (this._ipc || (this._ipc = window[globalName]));
  }

  send(action: IIpcAction) {
    if (!this.ipc) {
      throw new Error(`window.${globalName} is ${typeof window[globalName]}`);
    }
    this.ipc.send(down, action);
  }
}
