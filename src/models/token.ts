import { AccountInfo, PublicKey } from '@solana/web3.js';

export interface SPLToken {
  address: string;
  address_spl: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
}

export type Amount = number | bigint | string;

export interface TokenAccount<T> {
  pubkey: PublicKey;
  account: T;
  data: AccountInfo<Buffer>;
}
