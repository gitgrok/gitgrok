import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { localstackInitFinished, localstackInitStarted, localstackNavStarted, localstackCmdPrefix, execStarted } from '@gitgrok/isomorphic';
import { Store } from '@ngrx/store';
import { IFieldConfig, regexes } from '@onivoro/angular-serializable-forms';
import { Subject } from 'rxjs';
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { getCmds } from '../../state/app/app-state-exec.selectors';
import { getLocalStack, getLocalStackContents, getLocalStackPwd } from '../../state/app/app-state.selectors';
@Component({
  selector: 'onivoro-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent implements OnInit {
  valueChange$$ = new Subject<{ command: string }>();
  s$ = this.store;
  out$ = this.store.select(getCmds);
  exec$$ = new Subject();
  exec$ = this.exec$$.asObservable().pipe(
    withLatestFrom(this.valueChange$$),
    map(([_event, { command }]) => this.store.dispatch(execStarted({ cmd: command }))
    )
  );
  formData = { command: '' };
  formConfig: IFieldConfig = {
    fieldLayout: [['command']],
    fieldOptions: {
      command: {
        label: '>',
        type: 'text',
      }
    },
  };
  constructor(private store: Store,
  ) { }

  ngOnInit(): void {
    this.exec$.subscribe();
  }
}
