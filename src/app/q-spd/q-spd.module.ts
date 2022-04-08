import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QSpdRoutingModule } from './q-spd-routing.module';
import { QSpdComponent } from './q-spd.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';


@NgModule({
  declarations: [
    QSpdComponent
  ],
  imports: [
    CommonModule,
    QSpdRoutingModule,
    NgImageSliderModule,
    NgImageFullscreenViewModule
  ]
})
export class QSpdModule { }
