import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoatInfoRoutingModule } from './boat-info-routing.module';
import { BoatInfoComponent } from './boat-info.component';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';


@NgModule({
  declarations: [
    BoatInfoComponent
  ],
  imports: [
    CommonModule,
    BoatInfoRoutingModule,
    NgImageFullscreenViewModule
  ],
})
export class BoatInfoModule { }
