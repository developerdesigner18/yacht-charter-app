import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoatInfoRoutingModule } from './boat-info-routing.module';
import { BoatInfoComponent } from './boat-info.component';


@NgModule({
  declarations: [
    BoatInfoComponent
  ],
  imports: [
    CommonModule,
    BoatInfoRoutingModule
  ]
})
export class BoatInfoModule { }
