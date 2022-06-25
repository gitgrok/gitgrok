import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ILink } from '../../interfaces/i-link.interface';

@Component({
  selector: 'onivoro-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() readonly clicks = new EventEmitter<ILink>();
  @Input() links!: ILink[];

  clickWrapper(_$event: any, link: ILink) {
    this.clicks.emit(link);
  }
}
