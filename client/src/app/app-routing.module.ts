import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginformComponent } from './loginform/loginform.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginformComponent},
  {path: 'register', component: RegisterformComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
