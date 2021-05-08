import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ILink } from './interfaces/i-link.interface';
import { Subject } from 'rxjs';
import { links } from './constants/links';
import { up } from '@gitgrok/isomorphic';
import { upStarted } from './state/app/app-state.actions';

@Component({
  selector: 'gitgrok-root',
  template: `<onivoro-app-shell [links]="links" (clicks)="navigate($event)">
                <pre>{{state$|async|json}}</pre>
                <h1>testinggggg</h1>
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
  }

  constructor(private readonly router: Router, private readonly store: Store) { }

  ngOnInit(): void {
    window.addEventListener(up, ($event: any) => {
      console.warn('app.component listener', $event);
      this.store.dispatch(upStarted({...$event}))
    });
  }
}
