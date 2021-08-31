import {
  Component,
  ElementRef,
  OnInit,
  ViewChildren,
  Renderer2,
  ViewChild,
  QueryList,
} from '@angular/core';

import { AppState } from '../../store/store.reducer';
import * as actions from '../../store/actions';
import { Store } from '@ngrx/store';

import { Pokemon, PokemonData } from 'src/app/models/pokemon.model';
import { PokeapiService } from '../../services/pokeapi.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnInit {
  @ViewChildren('pokeOption') pokeOptions!: QueryList<ElementRef>;
  @ViewChild('pokeImg') pokeImg!: ElementRef;
  private subscription!: Subscription;
  private subscription2!: Subscription;
 
  optClicked: { clicked: boolean; correct: boolean } = {
    clicked: false,
    correct: false,
  };
  pokemonsToPlay!: PokemonData[];
  pokemonsList!: PokemonData[];
  correctAnswers: number = 0;
  loading: boolean = false;
  pokemon!: Pokemon | null;

  constructor(
    private _pokeapi: PokeapiService,
    private _store: Store<AppState>,
    private _r2: Renderer2
  ) {}

  ngOnInit(): void {
    this.initPokeInfo();
  }

  /**
   * Set pokemons data
   */
  initPokeInfo() {
    this.subscription = this._store.select('pokemons').subscribe((store) => {
      const { pokemonsList } = store;
      this.pokemonsList = pokemonsList;
      this.pokemonsToPlay = this.getPokeNames();
      this.getPokemonData();
    });
  }

  /**
   * Get data from a random pokemon register
   */
  getPokemonData() {
    this._pokeapi
      .getPokeInfo(this.pokemonsToPlay[Math.floor(Math.random() * 3)].url)
      .subscribe((pokemon) => {
        this.pokemon = <Pokemon>pokemon;
      });
  }

  /**
   * Get 3 names to complete the quizz 
   * @returns PokemonData[]
    getPokeNames() {
     let items: PokemonData[] = [];
     
     while (true) {
       if (this.pokemonsList.length > 3) {
         if (items.length === 3) break;
         
         const randomNumber: number = Math.floor(
           Math.random() * this.pokemonsList.length
           );
           
           items.push(this.pokemonsList[randomNumber]);
          } else {
            items = this.pokemonsList;
          }
        }
        
        return items;
      }
    */

  getPokeNames() {
    let indexes: number[] = [];
    while(indexes.length !== 3) {
      if(this.pokemonsList.length > 3) {
        let randomNumber: number = Math.floor(
          Math.random() * this.pokemonsList.length
        );
        
        let indexExists = indexes.find(indx => indx === randomNumber);
       
        while(indexExists) {
          randomNumber = Math.floor(
            Math.random() * this.pokemonsList.length
          );
          indexExists = indexes.find(indx => indx === randomNumber);
        }
  
        indexes.push(randomNumber);
      } else {
        indexes = [0, 1, 2]
      }
    }

    return [
      this.pokemonsList[indexes[0]],
      this.pokemonsList[indexes[1]],
      this.pokemonsList[indexes[2]]
    ]
  }
  /**
   * Shows hidden pokemon 
   * This will be triggered when the user clicks
   * @param namePokemon: string
   */
  selectPokemon(namePokemon: string) {
    this.optClicked.clicked = true;

    this._r2.addClass(this.pokeImg.nativeElement, 'show-pokemon');
    this._r2.removeClass(this.pokeImg.nativeElement, 'hidden-pokemon');

    if (namePokemon === this.pokemon?.name) {
      this.optClicked.correct = true;
      this.correctAnswers++;

      this._store.dispatch(
        actions.setTrainerScore({
          score: this.correctAnswers,
        })
      );
    }
  }

  /**
   * Next button behavior
   */
  nextPokemon() {
    this.optClicked.clicked = false;
    this.optClicked.correct = false;

    if(this.pokemonsList.length > 3) {
      const namePokemon: string = <string>this.pokemon?.name;
      this._store.dispatch(actions.setRightChoices({ pokemon: namePokemon }));
    }

    this.pokemon = null;
  }

  /**
   * Method to activate the password popup
   */
  saveScore() {
    this._store.dispatch(actions.togglePopup({ toggle: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
