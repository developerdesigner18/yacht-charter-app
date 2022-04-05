import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QSpdComponent } from './q-spd.component';

const routes: Routes = [{ path: '', component: QSpdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QSpdRoutingModule { }
