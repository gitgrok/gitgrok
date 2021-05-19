import { Injectable } from '@angular/core';
import { down, IAction, IIpcAction } from '@gitgrok/isomorphic';
import { IpcProvider } from '../providers/ipc.provider';

@Injectable({
  providedIn: 'root',
})
export class IpcActionService {
  constructor(private readonly ipcProvider: IpcProvider) {}
  dispatch<T>(action: IAction) {  
    return this.ipcProvider.ipc.send(down, action);
  }
}
