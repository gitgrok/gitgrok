import { Component } from '@angular/core';
import { Store } from '../../providers/store';
import { of, Subject } from 'rxjs';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';
import { SearchForm } from '../search-form/search-form';

@Component({
  selector: 'onivoro-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  onSearchFormValueChange = new Subject<SearchForm>();
  searchResults$ = of([]);

  // search$ = this.onSearchFormValueChange.asObservable().pipe(
  //   debounceTime(333),
  //   // withLatestFrom(this.selectedRepos$),
  //   map(([searchFormValue, repos]) => this.startSearch(repos, searchFormValue))
  // );

  constructor(private readonly store: Store) {}

  // private startSearch(repos, searchFormValue) {
  //   return this.store.dispatch(
  //     searchStarted({
  //       repos: searchFormValue.repoFilter
  //         ? repos.filter((rep) => rep.includes(searchFormValue.repoFilter))
  //         : repos,
  //       query: searchFormValue.query,
  //       pathFilter: searchFormValue.pathFilter,
  //     })
  //   );
  // }
}
