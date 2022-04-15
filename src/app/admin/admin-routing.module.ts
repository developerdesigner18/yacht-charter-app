import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../services/auth.guard';

import { LoginComponent } from './login/login.component';
import { EditBoatInfoComponent } from './edit-boat-info/edit-boat-info.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { EditQSpdComponent } from './edit-q-spd/edit-q-spd.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule), canActivate: [AuthGuard] },
  // { path: 'edit-home', loadChildren: () => import('./edit-home/edit-home.module').then(m => m.EditHomeModule) },
  { path: 'edit-home', component: EditHomeComponent, canActivate: [AuthGuard] },
  // { path: 'edit-boat-info', loadChildren: () => import('./edit-boat-info/edit-boat-info.module').then(m => m.EditBoatInfoModule) },
  { path: 'edit-boat-info', component: EditBoatInfoComponent, canActivate: [AuthGuard] },
  // { path: 'admin/edit-q-spd', loadChildren: () => import('./edit-q-spd/edit-q-spd.module').then(m => m.EditQSpdModule) },
  { path: 'edit-q-spd', component: EditQSpdComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
