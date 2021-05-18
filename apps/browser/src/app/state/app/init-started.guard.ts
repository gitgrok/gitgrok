import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { initStarted } from '@gitgrok/isomorphic';
@Injectable({
  providedIn: 'root',
})
export class InitStartedGuard implements CanActivate {
  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.store.dispatch(initStarted());

    return true;
  }

  constructor(private readonly store: Store) {}
}
