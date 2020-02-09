import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/user/components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './modules/user/components/register/register.component';
import { UserListComponent } from './modules/user/components/user-list/user-list.component';
import { UserComponent } from './modules/user/components/user/user.component';
import { LogoutComponent } from './modules/user/components/logout/logout.component';
import { RoleGuard } from './services/roles-guard.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'app', component: MainComponent, data: { title: 'Heroes List' },
    children: [
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [ RoleGuard ],
        data: { forRole: 'Admin' },
      },
      { path: 'users/new', component: UserComponent, data: { phase: 'new' } },
      { path: 'users/edit/:uid', component: UserComponent, data: { phase: 'edit' } },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class WppRoutingModule {
}
