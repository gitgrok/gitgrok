import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'onivoro-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    console.warn('on init');

    let bound = false;
    window.addEventListener('up', ($event: any) => {
      console.warn('up handler', $event);

      if (!bound) {
        window.addEventListener('down', ($event: any) => {
          console.warn('down handler in ui', $event);
        });
        window.dispatchEvent(
          new CustomEvent('down', { detail: 'detallado desde ui' })
        );

        bound = true;
      }
    });
  }
}
