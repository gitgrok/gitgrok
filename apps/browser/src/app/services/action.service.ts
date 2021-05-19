import { Injectable } from '@angular/core';
import { down, IIpcAction } from '@gitgrok/isomorphic';
import { IpcProvider } from '../providers/ipc.provider';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  constructor(private readonly ipcProvider: IpcProvider) {}
  dispatch<T>(action: {type: string}) {  
    const {type, ...actionProps} = action;
    const ipcAction: IIpcAction = {actionType: type, actionProps}  
    return this.ipcProvider.ipc.send(down, ipcAction);
  }
}
