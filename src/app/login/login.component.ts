import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wpp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hidePassword: boolean;
  public username: FormControl;
  public password: FormControl;

  constructor(private userService: UserService, private router: Router) {
    this.hidePassword = true;
    this.username = new FormControl('');
    this.password = new FormControl('');
  }

  ngOnInit() {
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  login() {
    this.userService.login({email: this.username.value, password: this.password.value})
      .subscribe(result => {
        this.router.navigateByUrl('/users');
      });
  }

}
