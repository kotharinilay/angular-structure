import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from 'app/shared/shared.module';
import { CommonService } from 'app/shared/services/common.service';
import { HttpClientService } from 'app/lib/http/http-client.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    CommonService,
    HttpClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
