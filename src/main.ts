import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './polyfills';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { sentryInit } from './sentry';
import { enableProdMode } from '@angular/core';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

if (environment.environment === 'production') {
  enableProdMode();
  sentryInit();
}
