import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wpp-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  public hidePassword: boolean;
  public loginForm: FormGroup;
  public recaptcha: FormControl;

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.hidePassword = true;
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
    this.recaptcha = new FormControl('');
  }

  ngOnInit() {
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  login() {
    const loginDto = this.loginForm.value;
    this.userService.login({ email: loginDto.username, password: loginDto.password })
      .subscribe(result => {
        this.router.navigateByUrl('/users');
      });
  }

}
