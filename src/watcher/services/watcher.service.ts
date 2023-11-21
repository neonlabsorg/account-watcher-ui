import { Injectable } from '@angular/core';
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { captureException } from '@sentry/angular-ivy';
import { BehaviorSubject, filter, SubscriptionLike, tap } from 'rxjs';
import Big from 'big.js';
import { amountView, itemUnsubscribe, NEON_TOKEN_MODEL, tokenAccountParser } from '../../utils';
import { environment } from '../../environments/environment';
import { VisibilityService } from './visibility.service';

@Injectable()
export class WatcherService {
  account = new PublicKey(environment.accounts.clime);
  endpoint = environment.urls.solana;
  token = NEON_TOKEN_MODEL;
  balance = new BehaviorSubject<BigInt>(0n);
  splBalance = new BehaviorSubject<BigInt>(0n);
  connection: Connection;
  minBalance = new Big(21e3 * 10 ** 9);
  private clientSubscriptionId: number;
  private subs: SubscriptionLike[] = [];

  show = (): void => {
    this.getBalance(this.account);
    this.accountWatcher(this.account);
  };

  hide = (): void => {
    if (this.clientSubscriptionId) {
      this.connection.removeAccountChangeListener(this.clientSubscriptionId);
    }
  };

  init() {
    this.connection = new Connection(this.endpoint, 'confirmed');
    this.v.init('watcher', this.show, this.hide);
    this.subs.push(this.splBalance.pipe(filter(b => Number(b) > 0), tap(b => {
      const balance = new Big(b.toString());
      if (balance.lte(this.minBalance)) {
        const expression = `Watcher: Low account balance. Current balance ${amountView(new Big(b.toString()), 9)} ${this.token.symbol}`;
        console.log(expression);
        captureException(expression);
      }
    })).subscribe());
  }

  destroy() {
    this.v.destroy('watcher');
    itemUnsubscribe(this.subs);
  }

  accountWatcher(wallet: PublicKey): void {
    const account = getAssociatedTokenAddressSync(new PublicKey(this.token.address_spl), wallet);
    this.clientSubscriptionId = this.connection.onAccountChange(account, (accountInfo) => {
      if (accountInfo) {
        const token = tokenAccountParser(account, accountInfo);
        if (token.account?.amount) {
          const { amount } = token.account;
          this.splBalance.next(amount);
        }
      }
    });
  }

  async getBalance(wallet: PublicKey): Promise<any> {
    const balance = await this.connection.getBalance(wallet);
    this.balance.next(BigInt(balance));
    const account = getAssociatedTokenAddressSync(new PublicKey(this.token.address_spl), wallet);
    const splBalance = await this.connection.getTokenAccountBalance(account);
    console.log(splBalance);
    if (splBalance.value) {
      const { amount, decimals } = splBalance.value;
      this.splBalance.next(BigInt(amount));
    }
  }

  constructor(private v: VisibilityService) {
  }
}
