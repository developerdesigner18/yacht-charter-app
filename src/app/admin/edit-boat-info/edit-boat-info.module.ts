import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBoatInfoRoutingModule } from './edit-boat-info-routing.module';
import { EditBoatInfoComponent } from './edit-boat-info.component';


@NgModule({
  declarations: [
    EditBoatInfoComponent
  ],
  imports: [
    CommonModule,
    EditBoatInfoRoutingModule
  ]
})
export class EditBoatInfoModule { }
