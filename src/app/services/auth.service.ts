import { Injectable } from '@angular/core';
import { Roles } from '../../classes/role';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Message } from '../../classes/message';
import { errorClasses } from '../../classes/error-classes';
import { Observable, Subject, throwError } from 'rxjs';
import { MessagingService } from '../modules/messaging/services/messaging.service';
import { UserService } from '../modules/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private roles: Roles[] = [
    Roles.Relative,
    Roles.Player,
    Roles.Trainer,
    Roles.Admin
  ];

  private _isAuthorized: boolean;
  private baseUrl: string;

  constructor(private http: HttpClient,
              private messagingService: MessagingService) {
    this.isAuthorized = false;
    this.baseUrl = 'http://localhost:3000/api';
    this.refreshToken();
  }

  get token() {
    return localStorage.getItem('JWT');
  }

  set token(token: string | null) {
    if (token) {
      localStorage.setItem('JWT', token);
    } else {
      localStorage.removeItem('JWT');
    }
  }

  get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  set isAuthorized(auth: boolean) {
    this._isAuthorized = auth;
  }

  public authorize(token: string) {
    this.token = token;
    this.isAuthorized = true;
  }

  public unauthorize() {
    this.token = null;
    this.isAuthorized = false;
  }

  refreshToken() {
    this.http.post(`${this.baseUrl}/session/verify`,
      {
        sessionId: this.token
      })
      .subscribe((data: any) => {
          if (data.valid as boolean) {
            this.isAuthorized = true;
          } else {
            this.unauthorize();
          }
        },
        catchError(this.errorHandler));
  }

  canDo(userRole: Roles, accessRole: Roles): boolean {
    return this.roles.indexOf(userRole) >= this.roles.indexOf(accessRole);
  }

  allowedFor(accessRole: Roles): Roles[] {
    const roleIndex = this.roles.indexOf(accessRole);
    return [ ...this.roles.splice(roleIndex) ];
  }

  private errorHandler = (error: HttpErrorResponse) => {
    const errMessage = new Message(error.message, errorClasses.error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errMessage.text = error.error.message;
    } else if (error.error) {
      errMessage.text = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    this.messagingService.sendMessage(errMessage);
    return throwError(error.error);
  };
}
