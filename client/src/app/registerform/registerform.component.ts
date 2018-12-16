import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  onSubmit() {
    console.warn(this.registerForm.value);
  }

  constructor() { }

  ngOnInit() {
  }

}
