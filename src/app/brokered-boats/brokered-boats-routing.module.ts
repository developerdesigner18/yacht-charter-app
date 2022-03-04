import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokeredBoatsComponent } from './brokered-boats.component';

const routes: Routes = [{ path: '', component: BrokeredBoatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokeredBoatsRoutingModule { }
