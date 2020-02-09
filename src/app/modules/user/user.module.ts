import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { WppRoutingModule } from '../../wpp-routing.module';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { CurrentUserProvider } from './services/currentUser.provider';
import { currentUserProviderFactory } from './services/currentUserProvider.factory';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    UserComponent,
    UserListComponent,
    CurrentUserComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    WppRoutingModule,
    MaterialModule,
    RecaptchaModule.forRoot({
      siteKey: '6LeToYoUAAAAAPi1H1opCj5VCVUl5mpRLmPzOYey',
    }),
  ],
  exports: [
    CurrentUserComponent
  ],
  providers: [
    UserService,
  ],
})
export class UserModule {
}
