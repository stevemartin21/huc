
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { RouteGuard } from './authenAuthorComponents/route-guard';

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
import { AddServiceComponent } from './adminComponents/add-service/add-service.component';
import { ManageServicesComponent } from './adminComponents/manage-services/manage-services.component';
import { AdminFooterComponent } from './adminComponents/admin-footer/admin-footer.component';
import { HttpModule } from '@angular/http';

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
    AdminNavigationComponent,
    AddServiceComponent,
    ManageServicesComponent,
    AdminFooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpModule
    HttpClientModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    WebSiteRoutingModule,
    AdminRoutingModule
  ],
  providers: [RouteGuard, MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
