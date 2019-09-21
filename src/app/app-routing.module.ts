import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared';
import { AuthGuard, SkipLoginGuard } from './core/guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [SkipLoginGuard],
    loadChildren: () => import('./modules/non-auth').then(m => m.NonAuthModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/auth').then(m => m.AuthModule)
  },
  {
    component: NotFoundComponent,
    path: '404'
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {
  onSameUrlNavigation: 'reload'
});
