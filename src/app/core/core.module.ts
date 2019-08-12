import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthGuard, SkipLoginGuard } from './guards';
import { ResponseInterceptor } from './interceptors';
import { HttpClientService } from './interceptors/http-client.service';
import { NotFoundComponent } from '../shared';
import { AuthService } from './services';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    AuthGuard,
    SkipLoginGuard,
    AuthService,
    HttpClientService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule
  ]
})
export class CoreModule { }
