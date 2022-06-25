import { Component } from '@angular/core';
import { Store } from '../../providers/store';
import { Subject } from 'rxjs';
import { defaultIfEmpty, tap, withLatestFrom } from 'rxjs/operators';
import { cloneStarted } from '@gitgrok/isomorphic';
import { RepoService } from '../../services/repo.service';

@Component({
  selector: 'onivoro-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent {
  repos$ = this.repoSvc.getRepos().pipe(defaultIfEmpty([]))
  urlSubject = new Subject();
  onAddSubject = new Subject();
  url$ = this.onAddSubject.asObservable().pipe(
    withLatestFrom(this.urlSubject.asObservable()),
    tap(([_click, url]) => this.onAdd(url as string))
  );

  onAdd(url: string) {
    this.store.dispatch(cloneStarted({url}));
  }

  constructor(private readonly store: Store, private readonly repoSvc: RepoService) {}
}
