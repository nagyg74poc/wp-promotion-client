import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { WppRoutingModule } from './wpp-routing.module';
import { AppComponent } from './components/app/app.component';
import { MaterialModule } from './modules/material/material.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { MessagesComponent } from './modules/messaging/components/messages/messages.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { UserService } from './modules/user/services/user.service';
import { HeaderInterceptor } from './services/http-interceptor.service';
import { UserModule } from './modules/user/user.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { CurrentUserProvider } from './modules/user/services/currentUser.provider';
import { currentUserProviderFactory } from './modules/user/services/currentUserProvider.factory';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    WppRoutingModule,
    UserModule,
    MessagingModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DATA,
      useValue: {},
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true // Add this line when using multiple interceptors.
    },
    CurrentUserProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: currentUserProviderFactory,
      deps: [ CurrentUserProvider ], multi: true
    },
    UserService,
  ],
  entryComponents: [
    MessagesComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
