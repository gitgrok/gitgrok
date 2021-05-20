import { Component, OnInit } from '@angular/core';
import { localstackInitFinished, localstackInitStarted } from '@gitgrok/isomorphic';
import { Store } from '@ngrx/store';
import { IFieldConfig, regexes } from '@onivoro/angular-serializable-forms';
import { Subject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { getLocalStack, getLocalStackContents, getLocalStackPwd } from '../../state/app/app-state.selectors';

@Component({
  selector: 'onivoro-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  valueChange$$ = new Subject();
  contents$ = this.store.select(getLocalStackContents);
  key$ = this.store.select(getLocalStackPwd);
  init$ = this.valueChange$$.asObservable().pipe(
    tap(({path}) => this.store.dispatch(localstackInitStarted({key: path}))),
  );
  formData = { path: '' };
  formConfig: IFieldConfig = {
    fieldLayout: [['path']],
    fieldOptions: {
      path: {
        label: '>',
        type: 'text',
      }
    },
  };
  constructor(private store: Store) { }
  ngOnInit(): void {
    this.init$.subscribe();
    this.store.dispatch(localstackInitStarted({ key: '' }))
  }
}
