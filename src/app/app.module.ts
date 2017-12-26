import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'app/shared/shared.module';
import { routing } from 'app/app.routing';

import { AppComponent } from './app.component';

import { CommonService } from 'app/shared/services/common.service';
import { AuthService } from 'app/shared/services/auth.service';
import { HttpClientService } from 'app/lib/http/http-client.service';

import { ResponseInterceptor } from 'app/lib/http/response-interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    routing
  ],
  providers: [
    CommonService,
    AuthService,
    HttpClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
