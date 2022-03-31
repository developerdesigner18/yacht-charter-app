import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditHomeRoutingModule } from './edit-home-routing.module';
import { EditHomeComponent } from './edit-home.component';


@NgModule({
  declarations: [
    EditHomeComponent
  ],
  imports: [
    CommonModule,
    EditHomeRoutingModule
  ]
})
export class EditHomeModule { }
