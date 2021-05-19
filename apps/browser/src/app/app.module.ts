import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SerializableFormsModule } from '@onivoro/angular-serializable-forms';
import { AppStateModule } from '../app/state/app/app-state.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RepositoryFormComponent } from './components/repository-form/repository-form.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchComponent } from './components/search/search.component';
import { MaterialModule } from './material.module';
import { IpcProvider } from './providers/ipc.provider';
import { IpcActionService } from './services/ipc-action.service';
import { RepoService } from './services/repo.service';
import { SearchService } from './services/search.service';
import { SearchStateModule } from './state/search/search-state.module';

const services = [SearchService, IpcActionService, RepoService];

const components = [
  AppComponent,
  RepositoryListComponent,
  RepositoryComponent,
  RepositoryFormComponent,
  SearchComponent,
  SearchFormComponent,
  HomeComponent,
  SearchResultComponent,
  AppShellComponent,
  NavbarComponent,
];

@NgModule({
  declarations: [...components],
  imports: [    
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SerializableFormsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    AppStateModule,
    SearchStateModule,
  ],
  providers: [...services, IpcProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
