import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppStateEffects } from './app-state.effects';
import { appStateName } from './app-state.name';
import { appStateReducer } from './app-state.reducer';
@NgModule({
  imports: [
    StoreModule.forFeature(appStateName, appStateReducer),
    EffectsModule.forFeature([AppStateEffects]),
  ],
})
export class AppStateModule {}
