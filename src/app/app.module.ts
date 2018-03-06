import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ResponseInterceptor } from 'app/lib/http/response-interceptor';
import { routing } from 'app/app.routing';

// Service imports
import { CommonService } from 'app/shared/services/common.service';
import { AuthService } from 'app/shared/services/auth.service';
import { HttpClientService } from 'app/lib/http/http-client.service';

// Guard imports
import { SkipLoginGuard } from 'app/guards/skip-login.guard';
import { AuthGuard } from 'app/guards/auth.guard';

// Module imports
import { SharedModule } from 'app/shared/shared.module';

// Component imports
import { AppComponent } from './app.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlankLayoutComponent } from './containers/blank-layout/blank-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotFoundComponent,
    BlankLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    routing,
    FormsModule
  ],
  providers: [
    CommonService,
    AuthService,
    HttpClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    SkipLoginGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
