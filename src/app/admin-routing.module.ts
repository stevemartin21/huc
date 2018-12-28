import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './adminComponents/dashboard/dashboard.component';
import { AddChurchComponent } from './adminComponents/add-church/add-church.component';
import { AddServiceComponent } from './adminComponents/add-service/add-service.component';
import { ManageChurchesComponent } from './adminComponents/manage-churches/manage-churches.component';
import { ManageServicesComponent } from './adminComponents/manage-services/manage-services.component';
import { RouteGuard } from './authenAuthorComponents/route-guard';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard] },
  {path: 'addChurch', component: AddChurchComponent, canActivate: [RouteGuard] },
  {path: 'addService', component: AddServiceComponent, canActivate: [RouteGuard]},
  {path: 'manageChurches', component: ManageChurchesComponent, canActivate: [RouteGuard]},
  {path: 'manageServices', component: ManageServicesComponent, canActivate: [RouteGuard]},
  {path: 'editChurch/:churchId', component: AddChurchComponent, canActivate: [RouteGuard]}

];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [RouteGuard]
})
export class AdminRoutingModule { }
