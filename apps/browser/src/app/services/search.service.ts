import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService extends BaseService {
  protected getApiPrefix(): string {
    return 'search';
  }

  constructor(private readonly http: HttpClient) {
    super();
  }

  get(text: string) {
    return this.http.get(this.apiUrl(`v1/${text}`));
  }

  getV2(text: string, pathFilter: string) {
    return this.http.get(this.apiUrl(`v2/${text}?pathFilter=${pathFilter}`));
  }
}
