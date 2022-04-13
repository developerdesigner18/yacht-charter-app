import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { EditBoatInfoComponent } from './edit-boat-info/edit-boat-info.component';
import { EditQSpdComponent } from './edit-q-spd/edit-q-spd.component';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    EditHomeComponent,
    EditBoatInfoComponent,
    EditQSpdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
})
export class AdminModule { }
