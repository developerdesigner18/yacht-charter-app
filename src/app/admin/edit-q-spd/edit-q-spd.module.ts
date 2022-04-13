import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditQSpdRoutingModule } from './edit-q-spd-routing.module';
import { EditQSpdComponent } from './edit-q-spd.component';


@NgModule({
  declarations: [
    EditQSpdComponent
  ],
  imports: [
    CommonModule,
    EditQSpdRoutingModule
  ]
})
export class EditQSpdModule { }
