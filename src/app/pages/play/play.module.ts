import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayComponent } from './play.component';
import { PlayRoutingModule } from './play-routing.module';

import { CardModule } from '../../components/card/card.module';
import { ModalModule } from '../../components/modal/modal.module';
import { SpinnerModule } from '../../components/spinner/spinner.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PlayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PlayRoutingModule, 
    CardModule, 
    ModalModule, 
    SpinnerModule, 
    ReactiveFormsModule, 
  ]
})
export class PlayModule { }
