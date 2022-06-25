import { Component, Input, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { RepoService } from '../../services/repo.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'onivoro-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit {
  @Input() url!: string;
  detail$!: Observable<any>;

  ngOnInit(): void {
    const { url } = this;
    this.detail$ = this.repoSvc.getBranches(url).pipe(
      map(details => ({ details, url })),
      catchError((e) => of({ url, details: e }))
    )
  }

  constructor(private repoSvc: RepoService) { }
}
