import { AccountInfo, PublicKey } from '@solana/web3.js';
import { AccountLayout, RawAccount } from '@solana/spl-token';
import { formatNumber } from '@angular/common';
import Big from 'big.js';
import { TokenAccount } from '../models';

export function tokenAccountParser(pubkey: PublicKey, data: AccountInfo<Buffer>): TokenAccount<RawAccount> {
  const account = AccountLayout.decode(Buffer.from(data.data));
  return { pubkey, account, data };
}

export const pubkeyView = (d: PublicKey, max = 10, concat = '..'): string => {
  if (d) {
    const pubkey = d.toBase58();
    const half = Math.round((max - concat.length) / 2);
    return `${pubkey.slice(0, half)}${concat}${pubkey.slice(-half)}`;
  }
  return '';
};

export const amountView = (amount: Big, decimals: number, mfd?: number): string => {
  return formatNumber(amountBig(amount, decimals).toNumber(), `en-EN`, `0.0-${mfd ? mfd : decimals}`);
};

export const amountBig = (amount: Big, decimals: number): Big => amount.div(new Big(10).pow(decimals));

export const toAmountBig = (amount: number | string, decimals: number): Big => new Big(amount).times(new Big(10).pow(decimals));
