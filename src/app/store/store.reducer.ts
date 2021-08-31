import { ActionReducerMap } from "@ngrx/store";

// Reducers
import * as reducers from './reducers/index'; 

export interface AppState {
    pokemons: reducers.PokemonsState, 
    trainer: reducers.TrainerState,
    popup: reducers.PopupState
};

export const appReducers: ActionReducerMap<AppState> = {
    pokemons: reducers.pokemonsReducer, 
    trainer: reducers.trainerReducer,
    popup: reducers.popupReducer
};