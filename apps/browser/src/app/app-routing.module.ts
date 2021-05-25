import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitStartedGuard } from '../app/state/app/init-started.guard';
import { HomeComponent } from './components/home/home.component';
import { LocalStackComponent } from './components/localstack/localstack.component';
import { home, localStackLink, repos, search } from './constants/links';
const pathMatch = 'full';

const routes: Routes = [
  {
    path: '',
    canActivate: [InitStartedGuard],
    children: [
      { path: home.slug, component: HomeComponent, pathMatch },
      { path: localStackLink.slug, component: LocalStackComponent, pathMatch },
      { path: '', redirectTo: home.slug, pathMatch },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
