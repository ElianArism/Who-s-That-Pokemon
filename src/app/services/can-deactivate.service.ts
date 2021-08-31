import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { resetPokemonsData } from '../store/actions/pokemon.actions';
import { resetTrainerData } from '../store/actions/trainer.actions';
import { AppState } from '../store/store.reducer';
@Injectable({
  providedIn: 'root'
})
export class CanDeactivateService {
  constructor(private _store: Store<AppState>) {}

  resetData() {
    this._store.dispatch(resetTrainerData());
    this._store.dispatch(resetPokemonsData());
  }
}
