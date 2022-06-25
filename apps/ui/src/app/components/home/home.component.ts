import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '../../providers/store';
import { IFieldConfig, regexes } from '@onivoro/angular-serializable-forms';
import { of, Subject } from 'rxjs';
import { catchError, concatMap, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { execRx } from '@onivoro/server-process';

@Component({
  selector: 'onivoro-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent implements OnInit {
  valueChange$$ = new Subject<{ command: string }>();
  s$ = this.store;
  cmd = '';
  exec$$ = new Subject();
  exec$ = this.exec$$.asObservable().pipe(
    withLatestFrom(this.valueChange$$),
    tap(([_event, { command }]) => (this.cmd = command)),
    concatMap(([_event, { command }]) =>
      execRx(command).pipe(
        catchError((e) => {
          console.warn(e);
          return of(e);
        }),
      ))
    );
  out$ = this.exec$;
  formData = { command: '' };
  formConfig: IFieldConfig = {
    fieldLayout: [['command']],
    fieldOptions: {
      command: {
        label: '>',
        type: 'text',
      },
    },
  };
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.exec$.subscribe();
  }
}
