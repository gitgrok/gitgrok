import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import {
  localstackInitStarted,
  localstackNavStarted,
  s3Prefix,
  localstackCmdPrefix,
} from '@gitgrok/isomorphic';
import { Store } from '@ngrx/store';
import { IFieldConfig } from '@onivoro/angular-serializable-forms';
import { Subject } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import {
  getLocalStack,
  getLocalStackContents,
  getLocalStackPwd,
} from '../../state/app/app-state.selectors';
@Component({
  selector: 'onivoro-home',
  templateUrl: './localstack.component.html',
  styleUrls: ['./localstack.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LocalStackComponent implements OnInit {
  s3Prefix = s3Prefix;
  lo = localstackCmdPrefix;
  valueChange$$ = new Subject<{ path: string }>();
  contents$ = this.store.select(getLocalStackContents);
  s$ = this.store;
  key$ = this.store.select(getLocalStackPwd);
  init$ = this.valueChange$$.asObservable().pipe(
    tap((key) => this.store.dispatch(localstackNavStarted({ key: key.path })))
  );
  nav$$ = new Subject();

  nav$ = this.nav$$.asObservable().pipe(
    withLatestFrom(this.key$),
    tap((d) => console.warn('nav$', d)),
    tap(([key, current]) =>
      key
        ? this.store.dispatch(
            localstackNavStarted({
              key: (current +
                (key as string)
                  ?.replace('PRE ', '')
                  .replace('//', '/')) as string,
            })
          )
        : this.store.dispatch(localstackInitStarted({ key: '' }))
    )
  );
  formData = { path: '' };
  formConfig: IFieldConfig = {
    fieldLayout: [['path']],
    fieldOptions: {
      path: {
        label: s3Prefix,
        type: 'text',
      },
    },
  };
  constructor(private store: Store) {
  }
  ngOnInit(): void {
    this.init$.subscribe();
    this.nav$.subscribe();
    this.nav$$.next('');
  }
}
