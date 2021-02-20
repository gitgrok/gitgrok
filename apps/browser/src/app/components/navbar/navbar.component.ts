import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ILink } from '../../interfaces/i-link.interface';

@Component({
  selector: 'onivoro-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() readonly clicks = new EventEmitter<number>();
  @Input() links: ILink[];

  clickWrapper(_$event, link) {
    this.clicks.emit(link);
  }
}
