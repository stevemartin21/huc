import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './adminComponents/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent}
]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AdminRoutingModule { }