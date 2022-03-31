import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBoatInfoComponent } from './edit-boat-info.component';

const routes: Routes = [{ path: '', component: EditBoatInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBoatInfoRoutingModule { }
