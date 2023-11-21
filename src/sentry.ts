import { init, routingInstrumentation, setTags } from '@sentry/angular-ivy';
import { BrowserTracing } from '@sentry/tracing';
import p from '../package.json';

export function sentryInit(): void {
  init({
    dsn: 'https://37488f6e61e758694802e8721632ae3d@sentry.neoninfra.xyz/7',
    integrations: [
      new BrowserTracing({
        tracePropagationTargets: ['localhost:4200', 'https://watch-account.web.app', 'https://watch-account.firebaseapp.com', 'watch-account.web.app', 'watch-account.firebaseapp.com'],
        routingInstrumentation: routingInstrumentation
      })
    ],
    tracesSampleRate: 1.0
  });
  setTags({ version: p.version });
}
