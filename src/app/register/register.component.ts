import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'wpp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hidePassword: boolean;
  public hideConfirmPassword: boolean;
  public name: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;

  constructor() {
    this.hidePassword = true;
    this.hideConfirmPassword = true;
    this.name = new FormControl('');
    this.email = new FormControl('');
    this.password = new FormControl('');
    this.confirmPassword = new FormControl('');
  }

  ngOnInit() {
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
  toggleConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  register() {
    console.log(this);
  }
}
