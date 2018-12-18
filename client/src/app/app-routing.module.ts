import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginformComponent } from './loginform/loginform.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { RemoveEventComponent } from './remove-event/remove-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';

const routes: Routes = [
  {path: 'login', component: LoginformComponent},
  {path: 'register', component: RegisterformComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'create', component: CreateEventComponent, canActivate: [AuthGuardService]},
  {path: 'remove/:id', component: RemoveEventComponent, canActivate: [AuthGuardService]},
  {path: 'edit/:id', component: EditEventComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
