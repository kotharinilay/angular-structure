import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout.component';

const routes: Routes = [{
  path: '', component: AuthLayoutComponent
}];

export const AuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
