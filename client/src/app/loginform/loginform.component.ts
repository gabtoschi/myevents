import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';

import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  credentials: TokenPayload = {
    email: '', name: '', password: ''
  };

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, 
              private router: Router, 
              private toastService: MzToastService) { }

  ngOnInit() {
    if (this.authService.isLogged()) this.router.navigateByUrl('/dashboard');
  }

  loginUser(){
    this.credentials.email = this.loginForm.get('email').value;
    this.credentials.password = this.loginForm.get('password').value;

    this.authService.login(this.credentials).subscribe(() => 
      { this.router.navigateByUrl('/dashboard'); },
      (err) => { 
        console.error(err);
        this.toastService.show('Login/senha incorretos.', 4000, 'red');
      }
    );
  }

}
