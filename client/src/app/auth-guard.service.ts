import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(){
    if (!this.authService.isLogged()){
      this.router.navigateByUrl('/');
      return false;
    } else return true;
  }
}
