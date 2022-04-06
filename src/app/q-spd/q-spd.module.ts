import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QSpdRoutingModule } from './q-spd-routing.module';
import { QSpdComponent } from './q-spd.component';
import { NgImageSliderModule } from 'ng-image-slider';


@NgModule({
  declarations: [
    QSpdComponent
  ],
  imports: [
    CommonModule,
    QSpdRoutingModule,
    NgImageSliderModule
  ]
})
export class QSpdModule { }
