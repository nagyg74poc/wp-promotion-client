import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Roles } from '../classes/role';
import { UserService } from '../services/user.service';
import { MessagesService } from '../services/messages.service';
import { fieldMatchValidator } from '../../utilities/fieldMatchValidator';
import { FieldMatchErrorStateMatcher } from '../../utilities/fieldMatchErrorStateMatcher';

@Component({
  selector: 'wpp-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;
  public hidePassword: boolean;
  public hideConfirmPassword: boolean;
  public name: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;

  public roles = Object.keys(Roles)
    .filter(key => !( key === Roles.Admin || key === Roles.Trainer ))
    .map(key => ( { value: Roles[ key ], text: key } ));

  public pwMatcher: FieldMatchErrorStateMatcher;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private messageService: MessagesService) {

    this.hidePassword = true;
    this.hideConfirmPassword = true;
    this.userForm = this.fb.group({
      name: '',
      surname: '',
      email: '',
      password: '',
      // confirmPassword: new FormControl('', [fieldMatchValidator('password', 'confirmPassword')]),
      confirmPassword: '',
      role: '',
      active: false,
    }, { validator: fieldMatchValidator('password', 'confirmPassword') });

    this.pwMatcher = new FieldMatchErrorStateMatcher('password', 'confirmPassword');
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
    const newUser = this.userForm.value;
    delete newUser.confirmPassword;
    // this.userService.register(newUser)
    //   .subscribe(result => console.log('result New:', result));
  }

}
