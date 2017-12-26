import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routing } from 'app/home/route';

@NgModule({
  imports: [
    routing
  ],
  declarations: [DashboardComponent]
})
export class HomeModule { }
