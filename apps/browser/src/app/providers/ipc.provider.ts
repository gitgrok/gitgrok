const token = 'puppeteer-ipc/browser';

import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class IpcProvider {
  private _ipc: any;

  send(type: string, payload: any) {
    return this._ipc || (this._ipc = window[token]).send(type, payload)
  }
}
