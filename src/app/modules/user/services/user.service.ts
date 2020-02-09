import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../../../../classes/user';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessagingService } from '../../messaging/services/messaging.service';
import { Message } from '../../../../classes/message';
import { errorClasses } from '../../../../classes/error-classes';
import { AuthService } from '../../../services/auth.service';
import { CurrentUserProvider } from './currentUser.provider';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private _currentUser: Subject<User | null>;
  baseUrl: string;

  constructor(private http: HttpClient,
              private messagingService: MessagingService,
              private currentUser: CurrentUserProvider,
              private authService: AuthService) {
    // this._currentUser = new Subject();
    this.baseUrl = 'http://localhost:3000/api';
  }

  // get currentUser(): Observable<User> {
  //   return this._currentUser;
  // }

  // public getCurrentUser() {
  //   return this.http.post<User>(`${this.baseUrl}/users/current`, null)
  //     .pipe(
  //       map((user: User | null) => {
  //         if (user) {
  //           // this._currentUser.next(new User(user));
  //         }
  //         return user;
  //       }),
  //       catchError(this.errorHandler)
  //     );
  // }

  public getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/users`)
      .pipe(catchError(this.errorHandler));
  }

  public getUser(userId: string) {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`)
      .pipe(catchError(this.errorHandler));
  }

  public editUser(user) {
    return this.http.post(`${this.baseUrl}/users`, user)
      .pipe(catchError(this.errorHandler));
  }

  public addUser(user) {
    return this.http.put(`${this.baseUrl}/users`, user)
      .pipe(catchError(this.errorHandler));
  }

  public register(user) {
    return this.addUser(user);
  }

  public login(user) {
    return this.http.post(`${this.baseUrl}/users/login`, user, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<User>) => {
          this.authService.authorize(response.headers.get('X-AUTH-TOKEN'));
          this.currentUser.setUser(response.body);
          // this._currentUser.next(new User(response.body));
        }),
        catchError(this.errorHandler));
  }

  public logout() {
    return this.http.post(`${this.baseUrl}/users/logout`, {})
      .pipe(
        map(() => {
          this.authService.unauthorize();
          this.currentUser.unsetUser();
          // this._currentUser.next();
        }),
        catchError(this.errorHandler));
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
  }
}
