import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'onivoro-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit {
  @Input() url!: string;

  constructor() {}

  ngOnInit(): void {}

  showBranches(_url: string) {}
}
