import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './webSiteComponents/home/home.component';
import { ContactComponent } from './webSiteComponents/contact/contact.component';
import { RegisterComponent } from './authenAuthorComponents/register/register.component';
import { LoginComponent } from './authenAuthorComponents/login/login.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class WebSiteRoutingModule { }
