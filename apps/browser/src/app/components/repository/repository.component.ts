import { Component, Input, OnInit } from '@angular/core';
import { detailRepoStarted } from '@gitgrok/isomorphic';
import { Store } from '@ngrx/store';
import { getDetail } from '../../state/app/app-state.selectors';

@Component({
  selector: 'onivoro-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit {
  @Input() url!: string;
  detail$ = this.store.select(getDetail);
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    const {url} = this;
    this.store.dispatch(detailRepoStarted({url}));
  }
}
