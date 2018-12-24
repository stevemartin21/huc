
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { DashboardComponent } from './adminComponents/dashboard/dashboard.component';
import { HomeComponent } from './webSiteComponents/home/home.component';
import { RegisterComponent } from './authenAuthorComponents/register/register.component';
import { NavigationComponent } from './webSiteComponents/navigation/navigation.component';
import { FooterComponent } from './webSiteComponents/footer/footer.component';
import { JumbotronComponent } from './webSiteComponents/jumbotron/jumbotron.component';
import { FeaturesComponent } from './webSiteComponents/features/features.component';
import { ProjectsComponent } from './webSiteComponents/projects/projects.component';
import { ContactComponent } from './webSiteComponents/contact/contact.component';
import { AddChurchComponent } from './adminComponents/add-church/add-church.component';
import { ManageChurchesComponent } from './adminComponents/manage-churches/manage-churches.component';
import { LoginComponent } from './authenAuthorComponents/login/login.component';
import { WebSiteRoutingModule } from './web-site-routing.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavigationComponent } from './adminComponents/admin-navigation/admin-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    RegisterComponent,
    NavigationComponent,
    FooterComponent,
    JumbotronComponent,
    FeaturesComponent,
    ProjectsComponent,
    ContactComponent,
    AddChurchComponent,
    ManageChurchesComponent,
    LoginComponent,
    AdminNavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    WebSiteRoutingModule,
    AdminRoutingModule
  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
