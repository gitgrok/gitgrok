import {
  detailRepoStarted,
  detailRepoFinished,
  IAction,
  localstackInitStarted,
  localstackNavStarted,
  execStarted,
} from '@gitgrok/isomorphic';
import { Injectable } from '@nestjs/common';
import { of, Observable } from 'rxjs';
import { catchError, concatMap, filter, map, tap } from 'rxjs/operators';
import { execRx } from '@onivoro/server-process';
import { RepositoryService } from './services/repository.service';
import { s3Prefix } from '@gitgrok/isomorphic';
import { ofType } from './functions/of-type';

export class AppEffects {
  constructor(
    private readonly repoSvc: RepositoryService,
    private readonly actions$: Observable<IAction>
  ) {}

  readonly detailRepoStarted$ = this.actions$.pipe(
    ofType(detailRepoStarted),
    concatMap(({ url }) =>
      this.repoSvc.get(url).pipe(
        map(
          (details) => ({ details, url }),
          catchError((e) => of({ url, details: e }))
        )
      )
    ),
    filter(({ details }) => !!details),
    tap((details) => console.log('deeeets', details, typeof details?.details)),
    map(({ url, details }) => detailRepoFinished({ url, details }))
  );

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

