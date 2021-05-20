import { Injectable } from '@angular/core';
import { down, IAction } from '@gitgrok/isomorphic';

@Injectable({
  providedIn: 'root',
})
export class IpcActionService {
  dispatch<T>(detail: IAction) {
    window.dispatchEvent(
      new CustomEvent('down', {
        detail
      })
    )
  }
}
