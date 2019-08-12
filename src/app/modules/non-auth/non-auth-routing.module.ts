import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonAuthLayoutComponent } from './non-auth-layout.component';
import { LandingPageComponent } from './components';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { InvitedUserComponent } from './components/invited-user/invited-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ActiveVerificationComponent } from './components/active-verification/active-verification.component';

const routes: Routes = [
  {
    path: '', component: NonAuthLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'active-verification/:userId', component: ActiveVerificationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:Id', component: ResetPasswordComponent },
      { path: 'invited-user/:id', component: InvitedUserComponent }
    ]
  }
];

export const NonAuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
