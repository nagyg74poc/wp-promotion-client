import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../../../classes/user';
import { CurrentUserProvider } from '../../services/currentUser.provider';

@Component({
  selector: 'wpp-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  public currentUser: User;
  constructor(private current: CurrentUserProvider) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.currentUser = this.current.user;
  }
}
