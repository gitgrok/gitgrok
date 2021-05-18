import { Component } from '@angular/core';
import { searchStarted } from '@gitgrok/isomorphic';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';
import {
  getResults,
  getSelectedRepos,
} from '../../state/search/search-state.selectors';
import { SearchForm } from '../search-form/search-form';

@Component({
  selector: 'onivoro-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  selectedRepos$ = this.store.select(getSelectedRepos);
  onSearchFormValueChange = new Subject<SearchForm>();
  searchResults$ = this.store.select(getResults);

  search$ = this.onSearchFormValueChange.asObservable().pipe(
    debounceTime(333),
    withLatestFrom(this.selectedRepos$),
    map(([searchFormValue, repos]) => this.startSearch(repos, searchFormValue))
  );

  constructor(private readonly store: Store) {}

  private startSearch(repos, searchFormValue) {
    return this.store.dispatch(
      searchStarted({
        repos: searchFormValue.repoFilter
          ? repos.filter((rep) => rep.includes(searchFormValue.repoFilter))
          : repos,
        query: searchFormValue.query,
        pathFilter: searchFormValue.pathFilter,
      })
    );
  }
}
