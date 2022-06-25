import { Component, Input, OnInit } from '@angular/core';
import { IAction } from '@gitgrok/isomorphic';

@Component({
  selector: 'gitgrok-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Input() action!: IAction;
  stamp = new Date();
  props: any;
  type!: string;

  constructor() { }

  ngOnInit(): void {
    const { type, ...props } = this.action as any;
    const {action: {type: innerType, ...innerProps}} = props;
    this.props = innerProps
    this.type = innerType;
  }

}
