import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  protected readonly apiHost = 'http://localhost:7777';

  protected abstract getApiPrefix(): string;
  apiUrl = (url?: string) =>
    `${this.apiHost}/${this.getApiPrefix()}/${url || ''}`;
}
