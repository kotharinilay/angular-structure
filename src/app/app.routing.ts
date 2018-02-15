import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkipLoginGuard } from 'app/guards/skip-login.guard';
import { AuthGuard } from 'app/guards/auth.guard';

import { LoginComponent } from 'app/modules/login/login.component';
import { LayoutComponent } from 'app/containers/layout/layout.component';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [SkipLoginGuard] },
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
      }
    ]
  },
  {
    component: NotFoundComponent,
    path: '404',
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
