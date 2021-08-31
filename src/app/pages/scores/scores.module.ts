import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoresRoutingModule } from './scores-routing.module';
import { ScoresComponent } from './scores.component';
import { ModalModule } from '../../components/modal/modal.module';
import { SpinnerModule } from '../../components/spinner/spinner.module';


@NgModule({
  declarations: [
    ScoresComponent
  ],
  imports: [
    CommonModule,
    ScoresRoutingModule, 
    ModalModule, 
    SpinnerModule
  ]
})
export class ScoresModule { }
