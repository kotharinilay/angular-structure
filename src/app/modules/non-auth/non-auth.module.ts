import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'app/modules/non-auth/login/login.component';
import { LoginService } from 'app/modules/non-auth/login/login.service';
import { NonAuthService } from 'app/modules/non-auth/non-auth.service';
import { NonAuthRouting } from 'app/modules/non-auth/non-auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NonAuthRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService,
    NonAuthService
  ]
})
export class NonAuthModule { }
