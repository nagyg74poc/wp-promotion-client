import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../modules/user/services/user.service';
import { User } from '../../classes/user';
import { AuthService } from './auth.service';
import { Roles } from '../../classes/role';
import { CurrentUserProvider } from '../modules/user/services/currentUser.provider';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private currentUser: User;

  constructor(private router: Router,
              private currentUserProvider: CurrentUserProvider,
              private authService: AuthService) {
    this.currentUser = this.currentUserProvider.user;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const forRole = route.data[ 'forRole' ] as Roles;
    if (this.authService.isAuthorized && this.currentUser && this.authService.canDo(this.currentUser.role, forRole)) {
      return true;
    }

    // navigate to login page
    this.router.navigate([ '/login' ]);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
