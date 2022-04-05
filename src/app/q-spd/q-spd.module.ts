import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QSpdRoutingModule } from './q-spd-routing.module';
import { QSpdComponent } from './q-spd.component';


@NgModule({
  declarations: [
    QSpdComponent
  ],
  imports: [
    CommonModule,
    QSpdRoutingModule
  ]
})
export class QSpdModule { }
