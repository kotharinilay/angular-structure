import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from 'app/home/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
