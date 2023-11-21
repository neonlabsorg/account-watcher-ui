import { SubscriptionLike } from 'rxjs';

export function itemUnsubscribe(sub: SubscriptionLike | SubscriptionLike[] | null): void {
  if (Array.isArray(sub)) {
    while (sub.length) {
      const s = sub.shift();
      if (s && !s.closed) {
        s.unsubscribe();
      }
    }
  } else {
    if (sub && !sub.closed) {
      sub.unsubscribe();
      sub = null;
    }
  }
}
