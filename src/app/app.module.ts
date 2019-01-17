import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { WppRoutingModule } from './wpp-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { MessagesComponent } from './messages/messages.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { CurrentUserComponent } from './current-user/current-user.component';
import { UserService } from './services/user.service';
import { HeaderInterceptor } from './services/http-interceptor.service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    MenuComponent,
    UserListComponent,
    UserComponent,
    MessagesComponent,
    CurrentUserComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    WppRoutingModule,
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
    UserService,
  ],
  entryComponents: [
    MessagesComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
