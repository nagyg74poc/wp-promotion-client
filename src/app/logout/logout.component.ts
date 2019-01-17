import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wpp-logout',
  template: '',
  // styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.logout()
      .subscribe(result => {
        this.router.navigateByUrl('/login');
      });
  }

}
