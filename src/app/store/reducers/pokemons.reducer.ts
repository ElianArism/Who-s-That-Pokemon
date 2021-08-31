import { createReducer, on } from '@ngrx/store';

import { PokemonData } from '../../models/pokemon.model';
import { Pokemon } from '../../models/pokemon.model';
import { resetPokemonsData } from '../actions/pokemon.actions';

import {
  setRightChoices,
  setLoading,
  setCurrentPokemon,
  setHttpPokeapiError,
  setPokemonDataList,
} from '../actions/pokemon.actions';

// model
export interface PokemonsState {
  pokemonsList: PokemonData[];
  currentPokemon: Pokemon | null;
  rightChoices: PokemonData[];
  loading: boolean;
}

// initialState
export const pokemonInitialState: PokemonsState = {
  pokemonsList: [],
  currentPokemon: null,
  rightChoices: [],
  loading: false,
};

// mutations
const _pokemonsReducer = createReducer(
  pokemonInitialState,

  on(setPokemonDataList, (state, { pokemonsData }) => ({
    ...state,
    pokemonsList: [...pokemonsData],
  })),

  on(setHttpPokeapiError, (state, { err }) => ({
    ...state,
    err,
  })),

  on(setCurrentPokemon, (state, { pokemon, filter }) => {
    return {
      ...state,
      pokemonsList: [
        ...state.pokemonsList.filter((p, indx) => indx !== filter),
      ],
      currentPokemon: { ...pokemon },
      rightChoices: [
        ...state.pokemonsList.filter((p, indx) => indx === filter),
      ],
    };
  }),

  on(setRightChoices, (state, { pokemon }) => {
    const pokemonsList = <PokemonData[]>(
      state.pokemonsList.filter((pkmn) => pkmn.name !== pokemon)
    );
    const pokemonSelected = state.pokemonsList.find(
      (pkmn) => pkmn.name === pokemon
    );

    return {
      ...state,
      rightChoices: [...state.rightChoices, <PokemonData>pokemonSelected],
      pokemonsList: [...pokemonsList],
    };
  }),
  on(setLoading, (state, { isLoading }) => ({
    ...state,
    loading: isLoading,
  })), 
  on(resetPokemonsData, (state) => {
    const { pokemonsList: pL, rightChoices } = state;
    const l = rightChoices.length; 
    
    for (let i = 0; i < l; i++) {
      pL.push(rightChoices[i]);
    }

    return {
      rightChoices: [], 
      pokemonsList: [...pL], 
      currentPokemon: null, 
      loading: false,
    }
  })
)

// mutation global for app
export function pokemonsReducer(state: any, action: any) {
  return _pokemonsReducer(state, action);
}
