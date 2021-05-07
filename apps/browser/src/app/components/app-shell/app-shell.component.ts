import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILink } from '../../interfaces/i-link.interface';
@Component({
  selector: 'onivoro-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent implements OnInit {
  @Input() links!: ILink[];
  @Output() clicks = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onClick($event) {
    this.clicks.next($event);
  }
}
