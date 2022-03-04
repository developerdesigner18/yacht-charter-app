import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoatInfoComponent } from './boat-info.component';

const routes: Routes = [{ path: '', component: BoatInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoatInfoRoutingModule { }
