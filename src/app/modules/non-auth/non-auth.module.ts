import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NonAuthRoutingModule } from './non-auth-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NonAuthLayoutComponent } from './non-auth-layout.component';
import { LandingPageComponent } from './components';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { InvitedUserComponent } from './components/invited-user/invited-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ActiveVerificationComponent } from './components/active-verification/active-verification.component';

@NgModule({
  declarations: [
    NonAuthLayoutComponent,
    LandingPageComponent,
    SignUpComponent,
    LoginComponent,
    ForgotPasswordComponent,
    InvitedUserComponent,
    ResetPasswordComponent,
    ActiveVerificationComponent
  ],
  imports: [
    CommonModule,
    NonAuthRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class NonAuthModule { }
