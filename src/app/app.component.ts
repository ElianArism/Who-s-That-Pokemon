import { Component, OnInit } from '@angular/core';
import { PokeapiService } from './services/pokeapi.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokeapi';

  constructor(private pokeapi: PokeapiService) {}

  ngOnInit() {
    this.pokeapi.getPokeData(); 
  }
}
