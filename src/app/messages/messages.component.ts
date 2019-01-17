import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { Message } from '../classes/message';

@Component({
  selector: 'wpp-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.scss' ],
})
export class MessagesComponent implements OnDestroy {
  message: any = {};
  data: any;
  subscription: Subscription;

  constructor( @Inject(MAT_SNACK_BAR_DATA) public msg: Message) {
    // subscribe to app component messages
    this.message = msg;
    // this.subscription = this.messageService.getMessage().subscribe(message => {
    //   this.message = message;
    // });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
  }

}
