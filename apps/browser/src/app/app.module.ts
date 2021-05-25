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
import { LocalStackComponent } from './components/localstack/localstack.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material.module';
import { IpcActionService } from './services/ipc-action.service';
import { SearchStateModule } from './state/search/search-state.module';

const services = [IpcActionService];

const components = [
  AppComponent,
  LocalStackComponent,
  HomeComponent,
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
  providers: [...services],
  bootstrap: [AppComponent],
})
export class AppModule {}
