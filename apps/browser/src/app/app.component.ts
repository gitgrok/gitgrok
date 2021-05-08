import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ILink } from './interfaces/i-link.interface';
import { Subject } from 'rxjs';
import { links } from './constants/links';
import { up } from '@gitgrok/isomorphic';
import { downStarted, upStarted } from './state/app/app-state.actions';

@Component({
  selector: 'gitgrok-root',
  template: `<onivoro-app-shell [links]="links" (clicks)="navigate($event)">
  <pre style="overflow-y:scroll; max-height: 80vh; display: block;">{{(state$|async)?.app?.downStream|json}}</pre>
  
                <router-outlet></router-outlet>
             </onivoro-app-shell>`,
})
export class AppComponent implements OnInit {
  links = links;
  route: any;
  state$ = this.store.select((s) => s);
  route$ = new Subject();

  navigate(link: ILink) {
    this.route = link;
    this.route$.next(link);
    this.router.navigate([link?.slug || '']);
    this.store.dispatch(downStarted({actionType: up, actionProps: {...link, icon: 'glory', id: +new Date()}}))
  }

  constructor(private readonly router: Router, private readonly store: Store) { }

  ngOnInit(): void {
    window.addEventListener(up, ({detail}: any) => {
      console.warn('app.component listener', detail);
      this.store.dispatch(upStarted({actionType: up, actionProps: detail}))
    });
  }
}
