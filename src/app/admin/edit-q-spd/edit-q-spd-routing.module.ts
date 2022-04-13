import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditQSpdComponent } from './edit-q-spd.component';

const routes: Routes = [{ path: '', component: EditQSpdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditQSpdRoutingModule { }
