import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagingService } from './services/messaging.service';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MessagesComponent,
  ],
  providers: [
    MessagingService,
  ],
})
export class MessagingModule { }
