import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { cloneStarted } from '@gitgrok/isomorphic';
import { getRepos } from '../../state/app/app-state.selectors';

@Component({
  selector: 'onivoro-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent {
  repos$ = this.store.select(getRepos);
  urlSubject = new Subject<string>();
  onAddSubject = new Subject();
  url$ = this.onAddSubject.asObservable().pipe(
    withLatestFrom(this.urlSubject.asObservable()),
    tap(([_click, url]) => this.onAdd(url))
  );

  onAdd(url) {
    this.store.dispatch(cloneStarted(url));
  }

  constructor(private readonly store: Store) {}
}
