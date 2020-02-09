import { Injectable } from '@angular/core';
import { User } from '../../../../classes/user';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class CurrentUserProvider {

  private currentUser: Subject<User | null>;
  private _currentUser: User;
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.currentUser = new Subject();
    this._currentUser = null;
    this.baseUrl = 'http://localhost:3000/api';
    this.currentUser.subscribe((user: User) => this._currentUser = user);
  }

  public get user(){
    return this._currentUser;
  }

  public getUser(): Subject<User | null> {
    return this.currentUser;
  }

  public setUser(user: User) {
    this.currentUser.next(user);
  }

  public unsetUser() {
    this.currentUser.next();
    this._currentUser = null;
  }

  load() {
    return new Promise((resolve, reject) => {
      this.http.post<User>(`${this.baseUrl}/users/current`, null)
        .subscribe(response => {
          if (response) {
            this.setUser(new User(response));
          }
          resolve(true);
        });
    });
  }
}
