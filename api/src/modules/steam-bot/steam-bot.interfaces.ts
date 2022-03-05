export interface SteamEconItem {
  assetid: string;
  contextid: number;
  appid: number;
}

export interface SteamBotOptions {
  accountName: string;
  password: string;
  proxy?: string;
}

export interface SendTradeOfferOptions {
  identitySecret?: string;
  cookies: string[];
  partner: string;
  theirItems?: SteamEconItem[];
  myItems?: SteamEconItem[];
}

export interface SendTradeOfferResult {
  tradeId: string;
  status: 'pending' | 'sent';
  myItems: SteamEconItem[];
}

export interface GetTradeOfferOptions {
  tradeId: string;
  cookies: string[];
}
