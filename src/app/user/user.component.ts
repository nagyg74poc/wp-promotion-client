import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Roles } from '../classes/role';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { MessagesService } from '../services/messages.service';
import { Message } from '../classes/message';
import { errorClasses } from '../classes/error-classes';

@Component({
  selector: 'wpp-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ],
})
export class UserComponent implements OnInit {

  public userForm: FormGroup;

  public phase: string;

  public roles = Object.keys(Roles)
    .map(key => ( { value: Roles[ key ], text: key } ));

  public hidePassword: boolean;
  public hideCnfPassword: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private fb: FormBuilder,
              private messageService: MessagesService) {
    this.hidePassword = true;
    this.hideCnfPassword = true;
  }

  ngOnInit() {
    this.phase = this.route.snapshot.data[ 'phase' ];
    const uid = this.route.snapshot.params[ 'uid' ];
    if (this.phase === 'edit') {
      this.userForm = this.fb.group({
        id: '',
        name: new FormControl({ value: '' }),
        surname: '',
        email: '',
        role: Roles.Player,
        active: false,
      });
      this.getUser(uid);
    } else if (this.phase === 'new') {
      this.userForm = this.fb.group({
        name: '',
        surname: '',
        email: '',
        password: '',
        // confirmPassword: new FormControl('', [Validators.required, this.pwMatch(this.userForm.controls['password'].value)]),
        confirmPassword: '',
        role: Roles.Player,
        active: false,
      });
    }
  }

  private getUser(userId) {
    this.userService.getUser(userId)
      .subscribe(this.mapUser);
  }

  private save() {
    console.log(this.userForm.value);
    if (this.phase === 'edit') {
      this.userService.editUser(this.userForm.value)
        .subscribe(result => {
            this.messageService.sendMessage(new Message('User saved', errorClasses.success, 1500));
            this.router.navigateByUrl('/users');
            // console.log('result Edit:', result);
          },
          err => {
            // this.messageService.sendMessage('Message from app Component to message Component!');
            // console.error('Error Result', err);
          });
    } else if (this.phase === 'new') {
      const newUser = this.userForm.value;
      delete newUser.confirmPassword;
      this.userService.addUser(newUser)
        .subscribe(result => console.log('result New:', result));
    }
  }

  private mapUser = (user: User) => {
    console.log(user);
    this.userForm.setValue({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      active: user.active,
    });
  };

  private togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  private toggleCnfPassword() {
    this.hideCnfPassword = !this.hideCnfPassword;
  }

}
