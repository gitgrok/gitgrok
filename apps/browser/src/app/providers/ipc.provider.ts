import { Injectable } from '@angular/core';
import { globalName } from '@gitgrok/isomorphic';

@Injectable({ providedIn: 'root' })
export class IpcProvider {
  private _ipc: any;

  get ipc() {
    this._ipc = (this._ipc || (this._ipc = window[globalName]));
    if (!this._ipc) {
      throw new Error(`window.${globalName} is ${typeof window[globalName]}`);
    }
    return this._ipc;
  }
}
