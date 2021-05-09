import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RepoService extends BaseService {
  openDir(dir: string) {
    return this.http.put(this.apiUrl(`open-dir`), { url: dir });
  }

  protected getApiPrefix(): string {
    return 'repos';
  }

  constructor(private readonly http: HttpClient) {
    super();
  }

  getRepos() {
    return this.http.get(this.apiUrl());
  }

  getBranches(url: string) {
    return this.http.get(this.apiUrl(`${url}/branches`));
  }

  trackRepo(url: string) {
    return this.http.put(this.apiUrl(), { url });
  }

  openRepo(url: string) {
    return this.http.get(this.apiUrl(`${url}/open-repo`));
  }
}
