import { Component, Input, OnInit } from '@angular/core';
import { detailRepoStarted } from '@gitgrok/isomorphic';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getDetail } from '../../state/app/app-state.selectors';

@Component({
  selector: 'onivoro-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit {
  @Input() url!: string;
  src$ = this.store.select(getDetail);
  detail$ = this.src$.pipe(
    map((o) => {
      return o[this.url];
    })
  );
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    const { url } = this;
    this.store.dispatch(detailRepoStarted({ url }));
  }
}
