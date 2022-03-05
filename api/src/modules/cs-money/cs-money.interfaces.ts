import { AxiosProxyConfig } from 'axios';

export interface GetSkinsListOptions {
  appId: number;
  limit: number;
  offset: number;
  rarity: number | string;
}

export interface SkinsList {
  items: Array<{ appId: number; float: string; id: number; nameId: number; price: number }>;
}

export interface GetSkinInfo {
  appId: number;
  id: number;
  proxy?: AxiosProxyConfig | false;
}

export interface SkinInfo {
  id: number;
  appId: number;
  defaultPrice: number;
  float: string;
  fullName: string;
}
