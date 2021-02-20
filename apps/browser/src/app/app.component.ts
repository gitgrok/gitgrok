import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { ILink } from './interfaces/i-link.interface';
import { Subject } from 'rxjs';
import {links} from './constants/links';

@Component({
  selector: 'gitgrok-root',
  template: `<onivoro-app-shell [links]="links" (clicks)="navigate($event)"><router-outlet></router-outlet></onivoro-app-shell>`,
})
export class AppComponent {
  links = links
  route: any;
  state$ = this.store.select(s => s);
  route$ = new Subject();

  navigate(link: ILink) {
    this.route = link;
    this.route$.next(link);
    this.router.navigate([link?.slug || '']);
  }

  constructor(private readonly router: Router, private readonly store: Store) {}
}
