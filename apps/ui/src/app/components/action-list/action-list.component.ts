import { Component, Input, OnInit } from '@angular/core';
import { Store } from '../../providers/store';

@Component({
  selector: 'gitgrok-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {
  actionList$ = this.store.actions$.subscribe();
  constructor(private readonly store: Store) { }

  ngOnInit(): void {

  }

}
