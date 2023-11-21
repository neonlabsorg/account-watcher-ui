import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import Big from 'big.js';
import { WatcherService } from '../../services/watcher.service';
import { amountView, pubkeyView } from '../../../utils';

@Component({
  selector: 'app-watcher-page',
  templateUrl: './watcher-page.component.html',
  styleUrls: ['./watcher-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatcherPageComponent implements OnInit, OnDestroy {

  get alert(): Observable<string> {
    return this.w.splBalance.pipe(filter(b => Number(b) > 0), map(b => {
      return new Big(b.toString()).lte(this.w.minBalance) ? `red` : `green`;
    }));
  }

  get link(): string {
    return `https://explorer.solana.com/address/${this.w.account}/tokens`;
  }

  get balanceSol(): Observable<string> {
    return this.w.balance.pipe(map(balance => {
      return `Solana: ${amountView(new Big(balance.toString()), 9)} SOL`;
    }));
  }

  get neonSol(): Observable<string> {
    return this.w.splBalance.pipe(map(balance => {
      return `Neon: ${amountView(new Big(balance.toString()), 9)} ${this.w.token.symbol}`;
    }));
  }

  get account(): string {
    return pubkeyView(this.w.account, 20);
  }

  ngOnInit() {
    this.w.init();
  }

  ngOnDestroy() {
    this.w.destroy();
  }

  constructor(public w: WatcherService) {
  }
}
