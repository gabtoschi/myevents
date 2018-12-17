import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {
  credentials: TokenPayload = {
    email: '', name: '', password: ''
  };

  registerForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  registerUser() {
    this.credentials.name = this.registerForm.get('name').value;
    this.credentials.email = this.registerForm.get('email').value;
    this.credentials.password = this.registerForm.get('password').value;

    this.authService.register(this.credentials).subscribe(() => 
      { this.router.navigateByUrl('/profile'); },
      (err) => { console.error(err); }
    );
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

}
