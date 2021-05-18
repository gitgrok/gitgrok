import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRepoSearchResult } from '@gitgrok/isomorphic';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { openDirStarted } from '@gitgrok/isomorphic';

@Component({
  selector: 'onivoro-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  constructor(private readonly store: Store) { }

  @Input() rawResult!: any;
  result!: IRepoSearchResult;
  hidden = false;
  activeMatch: any;  
  openSubject = new Subject<string>();

  ngOnInit(): void {
    this.result = {
      fileList: [],
      lineCount: 0,
      matches: [],
      path: '',
      repo: '',
    };

    this.openSubject
      .pipe(map((dir) => this.store.dispatch(openDirStarted({ dir }))))
      .subscribe();

  }
}
