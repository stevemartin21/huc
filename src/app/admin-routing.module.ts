import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './adminComponents/dashboard/dashboard.component';
import { AddChurchComponent } from './adminComponents/add-church/add-church.component';
import { AddServiceComponent } from './adminComponents/add-service/add-service.component';
import { ManageChurchesComponent } from './adminComponents/manage-churches/manage-churches.component';
import { ManageServicesComponent } from './adminComponents/manage-services/manage-services.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'addChurch', component: AddChurchComponent},
  {path: 'addService', component: AddServiceComponent},
  {path: 'manageChurches', component: ManageChurchesComponent},
  {path: 'manageServices', component: ManageServicesComponent},

]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AdminRoutingModule { }
