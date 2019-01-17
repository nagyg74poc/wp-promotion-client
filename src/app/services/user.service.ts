import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../classes/user';
import { Observable, of, OperatorFunction, Subject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { Message } from '../classes/message';
import { errorClasses } from '../classes/error-classes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser: Subject<User | null>;
  baseUrl: string;

  constructor(private http: HttpClient, private messageService: MessagesService) {
    this._currentUser = new Subject();
    this.baseUrl = 'http://localhost:3000/api';
  }

  get currentUser(): Observable<User> {
    return this._currentUser;
  }

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

  public login(user) {
    return this.http.post(`${this.baseUrl}/users/login`, user, {observe: 'response'})
      .pipe(
        map((response: HttpResponse<User>) => {
        localStorage.setItem('JWT', response.headers.get('X-AUTH-TOKEN'));
        this._currentUser.next(new User().deserialize(response.body));
      }),
        catchError(this.errorHandler));
  }

  public logout() {
    return this.http.post(`${this.baseUrl}/users/logout`, {})
      .pipe(
        map(() => {
          localStorage.removeItem('JWT');
          this._currentUser.next();
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
    this.messageService.sendMessage(errMessage);
    return throwError(error.error);
  };
}
