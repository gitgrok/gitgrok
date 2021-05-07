import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SearchStateEffects } from './search-state.effects';
import { searchStateName } from './search-state.name';
import { searchStateReducer } from './search-state.reducer';
@NgModule({
  imports: [
    StoreModule.forFeature(searchStateName, searchStateReducer),
    EffectsModule.forFeature([SearchStateEffects]),
  ],
})
export class SearchStateModule {}
