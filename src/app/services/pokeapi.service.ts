import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { PokemonData } from '../models/pokemon.model';

import { Store } from '@ngrx/store';
import { AppState } from '../store/store.reducer';
import * as actions from '../store/actions/index'; 

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon?limit=151';
 
  constructor(
    private http: HttpClient, 
    private store: Store<AppState>  
  ) {}

  getPokeData(): void {
    this.http.get(this.url)
    .subscribe((response: any) => {
      this.store.dispatch(
        actions.setPokemonDataList({
          pokemonsData: <PokemonData[]>response.results
        })
      );
    }, 
    (err) => {
      console.log(err); 
      this.store.dispatch(
        actions.setHttpPokeapiError(
          {err}
        )
      );
    });
  }

  getPokeInfo(url: string) {
    return this.http.get(url)
  }
}
