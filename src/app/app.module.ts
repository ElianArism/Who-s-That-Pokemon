import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { ComponentsModule } from './components/components.module';
import { AngularFireModule } from '@angular/fire';
import * as reducers from './store/reducers';
import { PlayGuard } from './guard/play.guard';
import { popupReducer } from './store/reducers/popup.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),

    // Store config
    StoreModule.forRoot({
      pokemons: reducers.pokemonsReducer,
      trainer: reducers.trainerReducer,
      popup: popupReducer,
    }),

    // Devtools NGRX config
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [PlayGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
