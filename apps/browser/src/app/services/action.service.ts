import { Injectable } from '@angular/core';
import { IIpcAction } from '@gitgrok/isomorphic';
import { IpcProvider } from '../providers/ipc.provider';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  constructor(private readonly ipc: IpcProvider) {}
  dispatch<T>(action: IIpcAction) {    
    return this.ipc.send(action);
  }
}
