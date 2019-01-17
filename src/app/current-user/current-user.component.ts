import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'wpp-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  public currentUser: User;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  private getCurrentUser(){
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }
}
