import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrokeredBoatsRoutingModule } from './brokered-boats-routing.module';
import { BrokeredBoatsComponent } from './brokered-boats.component';


@NgModule({
  declarations: [
    BrokeredBoatsComponent
  ],
  imports: [
    CommonModule,
    BrokeredBoatsRoutingModule
  ]
})
export class BrokeredBoatsModule { }
