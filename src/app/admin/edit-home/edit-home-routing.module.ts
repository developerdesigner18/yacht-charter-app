import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditHomeComponent } from './edit-home.component';

const routes: Routes = [{ path: '', component: EditHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditHomeRoutingModule { }
