import { CsGoRarity, Game } from '@pot-back/common';
import { AxiosProxyConfig } from 'axios';

export interface CSMoneySkinsBaseResponse {
  [key: string]: {
    m: string;
    a: number;
    e: string;
  };
}

export interface CsMoneyUpdatePricesJob {
  game: Game;
  payload?: {
    rarity?: CsGoRarity | number;
    proxy?: AxiosProxyConfig;
    offsetStart?: number;
    offsetEnd?: number;
  };
}
