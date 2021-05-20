import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ILink } from './interfaces/i-link.interface';
import { Subject } from 'rxjs';
import { links } from './constants/links';
import { down, navStarted, up } from '@gitgrok/isomorphic';
import { downStarted, upStarted,  } from '@gitgrok/isomorphic';

@Component({
  selector: 'gitgrok-root',
  template: `<onivoro-app-shell [links]="links" (clicks)="navigate($event)">
                <router-outlet></router-outlet>
             </onivoro-app-shell>
             <pre style="padding-left: 200px;">{{(state$|async)?.localstack|json}}</pre>`,
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
    this.store.dispatch(navStarted(link as any))
  }

  constructor(private readonly router: Router, private readonly store: Store) { }

  ngOnInit(): void {
    window.addEventListener(up, ({detail}: any) => {
      console.warn('app.component up', detail);
      this.store.dispatch(detail)
    });

    window.addEventListener(down, ({detail}: any) => {
      console.warn('app.component down', detail);
      (window as any).down?.(detail);
    });
  }
}
