import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createErrorHandler, TraceService } from '@sentry/angular-ivy';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

const providers = environment.production ? [
  { provide: ErrorHandler, useValue: createErrorHandler({ showDialog: false }) },
  { provide: TraceService, deps: [Router] },
  {
    provide: APP_INITIALIZER, useFactory: () => () => {
    }, deps: [TraceService], multi: true
  }] : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [...providers],
  bootstrap: [AppComponent]
})
export class AppModule {
}
