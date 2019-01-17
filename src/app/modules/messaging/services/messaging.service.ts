import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Message } from '../../../../classes/message';
import { errorClasses } from '../../../../classes/error-classes';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private subject = new Subject<Message>();

  constructor(public snackBar: MatSnackBar) {

  }

  sendMessage(message: Message) {
    this.subject.next(message);
    const msgOptions: MatSnackBarConfig = {
      panelClass: errorClasses[ message.style ],
    };
    let action = 'Close';
    if (message.duration) {
      msgOptions.duration = message.duration;
      action = null;
    }
    this.snackBar.open(message.text, action, msgOptions);
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
