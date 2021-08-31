import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
