import { Component, OnInit } from '@angular/core';
import { localstackInitFinished, localstackInitStarted, localstackNavStarted } from '@gitgrok/isomorphic';
import { Store } from '@ngrx/store';
import { IFieldConfig, regexes } from '@onivoro/angular-serializable-forms';
import { Subject } from 'rxjs';
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { getLocalStack, getLocalStackContents, getLocalStackPwd } from '../../state/app/app-state.selectors';

@Component({
  selector: 'onivoro-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  valueChange$$ = new Subject<{path:string}>();
  contents$ = this.store.select(getLocalStackContents);
  key$ = this.store.select(getLocalStackPwd);
  init$ = this.valueChange$$.asObservable().pipe(
    tap(v => console.warn('vvvvv', v)),
    tap((key) => this.store.dispatch(localstackInitStarted({ key: key.path }))),
  );
  nav$$ = new Subject();

  nav$ = this.nav$$.asObservable().pipe(
    tap(d => console.warn('nav$', d)),
    tap((key) => this.store.dispatch(localstackNavStarted({ key: key as string })))
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
    this.nav$.subscribe();
  }
}
