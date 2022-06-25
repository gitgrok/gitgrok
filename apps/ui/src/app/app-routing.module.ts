import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { SearchComponent } from './components/search/search.component';
import { console, repos, search } from './constants/links';
const pathMatch = 'full';

const routes: Routes = [
  {
    path: '',
    // canActivate: [InitStartedGuard],
    children: [
      { path: repos.slug, component: RepositoryListComponent, pathMatch },
      { path: search.slug, component: SearchComponent, pathMatch },
      { path: console.slug, component: HomeComponent, pathMatch },
      { path: '', redirectTo: console.slug, pathMatch },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
