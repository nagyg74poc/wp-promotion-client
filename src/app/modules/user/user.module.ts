import { NgModule } from '@angular/core';
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
  ],
  exports: [
    CurrentUserComponent
  ],
  providers: [
    UserService,
  ],
})
export class UserModule { }
