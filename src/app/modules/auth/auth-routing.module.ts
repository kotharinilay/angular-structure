import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout.component';

const routes: Routes = [{
  path: '', component: AuthLayoutComponent,
  children: [
    {
      path: 'user',
      loadChildren: () => import(`./modules/user`).then(m => m.UserModule)
    }
  ]
}];

export const AuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
