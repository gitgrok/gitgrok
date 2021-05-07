import { Injectable } from '@angular/core';
import { IpcProvider } from '../providers/ipc.provider';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  constructor(private readonly ipc: IpcProvider) {}
  dispatch<T>(type: string, payload: T) {    
    return this.ipc.send(type, payload);
  }
}
