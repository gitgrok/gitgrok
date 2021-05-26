import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getActionListDown, getDetail } from '../../state/app/app-state.selectors';

@Component({
  selector: 'gitgrok-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {
  actionList$ = this.store.select(getActionListDown);
  constructor(private readonly store: Store) { }

  ngOnInit(): void {

  }

}
