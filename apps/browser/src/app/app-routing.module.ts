import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitStartedGuard } from '../app/state/app/init-started.guard';
import { HomeComponent } from './components/home/home.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { SearchComponent } from './components/search/search.component';
import { home, repos, search } from './constants/links';
const pathMatch = 'full';

const routes: Routes = [
  {
    path: '',
    canActivate: [InitStartedGuard],
    children: [
      { path: repos.slug, component: RepositoryListComponent, pathMatch },
      { path: search.slug, component: SearchComponent, pathMatch },
      { path: home.slug, component: HomeComponent, pathMatch },
      { path: '', redirectTo: home.slug, pathMatch },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
