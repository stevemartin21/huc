import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './webSiteComponents/home/home.component';
import { ContactComponent } from './webSiteComponents/contact/contact.component';
import { RegisterComponent } from './authenAuthorComponents/register/register.component';
import { LoginComponent } from './authenAuthorComponents/login/login.component';
import { DashboardComponent } from './adminComponents/dashboard/dashboard.component';
import { RouteGuard } from './authenAuthorComponents/route-guard';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard]}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class WebSiteRoutingModule { }
