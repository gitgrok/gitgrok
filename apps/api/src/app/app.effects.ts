import {
  IAction,
  localstackInitStarted,
  localstackNavStarted,
  execStarted,
} from '@arc/isomorphic';
import { of, Observable } from 'rxjs';
import { catchError, concatMap, filter, map, tap } from 'rxjs/operators';
import { execRx } from '@onivoro/server-process';
import { s3Prefix } from '@arc/isomorphic';
import { ofType } from '@onivoro/server-app-vscx';

export class ApiEffects {
  constructor(
    private readonly actions$: Observable<IAction>
  ) { }

  private lsLocalStack$$ = (key: string) => {
    const cmd = `awslocal --endpoint-url=http://localhost:6654 s3 ls ${s3Prefix}${key}`;
    console.log(cmd);
    return execRx(cmd);
  };
  readonly localstack$ = this.actions$.pipe(
    filter(
      (a) =>
        a.type === localstackInitStarted.type ||
        a.type === localstackNavStarted.type
    ),
    concatMap((action) =>
      this.lsLocalStack$$((action as any).key).pipe(
        map((output) => output.split('\n')?.map?.((l) => l.trim())),
        catchError((e) => {
          console.warn(e);
          return of(e);
        }),
        map((results) => ({
          type: action.type.replace('START', 'FINISH'),
          results,
        }))
      )
    )
  );

  readonly exec$$ = this.actions$.pipe(
    ofType(execStarted),
    concatMap(({ type, cmd }: any) =>
      execRx(cmd).pipe(
        catchError((e) => {
          console.warn(e);
          return of(e);
        }),
        map((results) => ({
          type: type.replace('START', 'FINISH'),
          results,
          cmd,
        }))
      )
    )
  );
}
