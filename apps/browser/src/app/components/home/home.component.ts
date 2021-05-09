import { Component } from '@angular/core';
import {ApiService} from '@gitgrok/browser-api';
import { of } from 'rxjs';

@Component({
  selector: 'onivoro-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private readonly apiService: ApiService) {}
  lee$ = of(Object.keys(this.apiService).join());
}
