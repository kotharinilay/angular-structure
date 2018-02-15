import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRouting } from 'app/modules/dashboard/dashboard.routing';

@NgModule({
  imports: [
    dashboardRouting
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
