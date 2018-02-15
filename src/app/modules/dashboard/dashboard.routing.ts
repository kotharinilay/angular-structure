import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from 'app/modules/dashboard/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', component: DashboardComponent }
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(routes);
