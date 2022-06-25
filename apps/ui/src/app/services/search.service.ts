import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { searchStarted } from '@gitgrok/isomorphic';
import { Store } from '../providers/store';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService extends BaseService {
  protected getApiPrefix(): string {
    return 'search';
  }

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store
  ) {
    super();
  }

  get(text: string) {
    return this.http.get(this.apiUrl(`v1/${text}`));
  }

  getV2(text: string, pathFilter: string) {
    this.getV3(text, pathFilter);
    return this.http.get(this.apiUrl(`v2/${text}?pathFilter=${pathFilter}`));
  }

  getV3(query: string, pathFilter: string) {
    // return this.actionService.dispatch({ actionType: 'search', actionProps: { text, pathFilter } });
    return this.store.dispatch(
      searchStarted({ query, pathFilter, repos: null })
    );
  }
}
