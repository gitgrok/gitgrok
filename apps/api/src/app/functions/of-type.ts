import { IAction } from '@gitgrok/isomorphic';
import { filter } from 'rxjs/operators';

export function ofType({ type }: IAction) {
  return filter((a: any) => {
    return a.type === type;
  });
}
