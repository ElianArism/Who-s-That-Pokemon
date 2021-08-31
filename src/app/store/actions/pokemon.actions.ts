import { createAction, props } from "@ngrx/store"; 
import { Pokemon, PokemonData } from '../../models/pokemon.model';

export const setPokemonDataList = createAction(
    '[Pokemons] Set PokemonData List.', 
    props<{pokemonsData: PokemonData[]}>()
);

export const setHttpPokeapiError = createAction(
    '[Pokemons] Establish errors related to requests towards pokeapi.', 
    props<{err: string}>()
);

export const setCurrentPokemon = createAction(
    '[Pokemons] Set a new pokemon.', 
    props<{pokemon: Pokemon, filter: number}>()
);

export const setRightChoices = createAction(
    '[Pokemons] Set right choices.', 
    props<{ pokemon: string }>()
);

export const setLoading = createAction(
    '[Pokemons] Set load.', 
    props<{isLoading: boolean}>()
);

export const resetPokemonsData = createAction(
    '[Trainer] Reset trainer data.',
)