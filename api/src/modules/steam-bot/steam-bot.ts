import { Game } from '@pot-back/common';
import {
  GetTradeOfferOptions,
  SendTradeOfferOptions,
  SendTradeOfferResult,
  SteamBotOptions,
  SteamEconItem,
} from './steam-bot.interfaces';

const SteamCommunity = require('steamcommunity');
const SteamTOTP = require('steam-totp');
const Request = require('request');
const TradeOfferManager = require('steam-tradeoffer-manager');

export class SteamBot {
  private accountName: string;
  private password: string;
  private proxy: string;
  private steamCommunity;

  constructor(options?: SteamBotOptions) {
    if (options) {
      const { accountName, password, proxy } = options;

      this.accountName = accountName;
      this.password = password;
      if (proxy) this.proxy = proxy;
    }
  }

  public async login({ sharedSecret }) {
    const twoFactorCode = await new Promise((resolve, reject) =>
      SteamTOTP.getAuthCode(sharedSecret, (err, code) => {
        if (err) reject(err);
        else resolve(code);
      }),
    );

    const steamCommunityOptions: Record<string, any> = {};
    if (this.proxy) {
      steamCommunityOptions.request = Request.defaults({ proxy: this.proxy });
    }

    this.steamCommunity = new SteamCommunity(steamCommunityOptions);
    return new Promise<string[]>((resolve, reject) => {
      this.steamCommunity.login(
        { accountName: this.accountName, password: this.password, twoFactorCode },
        (err, sessionId, cookies: string[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(cookies);
          }
        },
      );
    });
  }

  public getAccountInfo() {
    return new Promise<any>((resolve, reject) => {
      this.steamCommunity.getSteamUser(this.steamCommunity.steamID, (err, info) => {
        if (err) {
          reject(err);
        } else {
          const name = info.name;
          const avatar = info.getAvatarURL('medium', 'https://');
          const profileUrl = 'https://steamcommunity.com/profiles/' + info.steamID.getSteamID64();

          resolve({ name, avatar, profileUrl });
        }
      });
    });
  }

  public getTradeOfferUrl() {
    return new Promise<string>((resolve, reject) => {
      this.steamCommunity.getTradeURL((err, url) => {
        if (err) reject(err);
        else resolve(url);
      });
    });
  }

  public async getInventoryItems(cookies: string[], game: Game) {
    const manager = new TradeOfferManager({
      language: 'en',
    });

    await new Promise<void>((resolve, reject) => {
      manager.setCookies(cookies, err => {
        if (err) reject(err);
        else resolve();
      });
    });

    return new Promise<SteamEconItem[]>((resolve, reject) => {
      manager.getInventoryContents(game, 2, true, (err, inventory) => {
        if (err) reject(err);
        else {
          manager.shutdown();
          resolve(inventory);
        }
      });
    });
  }

  public async sendTradeOffer(options: SendTradeOfferOptions) {
    const { partner, theirItems, myItems, cookies, identitySecret } = options;
    const community = new SteamCommunity();
    community.setCookies(cookies);

    const manager = new TradeOfferManager({
      community,
      language: 'en',
    });

    const offer = manager.createOffer(partner);
    offer.addTheirItems(theirItems);
    offer.addMyItems(myItems);

    return new Promise<SendTradeOfferResult>((resolve, reject) => {
      offer.send((err, status) => {
        if (err) {
          reject(err);
        } else {
          if (identitySecret && myItems?.length) {
            community.acceptConfirmationForObject(identitySecret, offer.id, err => {
              if (err) reject(err);
              else resolve({ tradeId: offer.id, status: 'sent', myItems });
            });
          } else {
            resolve({ tradeId: offer.id, status, myItems });
          }
        }
      });
    });
  }

  public async getTradeOffer(options: GetTradeOfferOptions) {
    const { tradeId, cookies } = options;
    const manager = new TradeOfferManager({
      language: 'en',
      pollInterval: -1,
    });

    await new Promise<void>((resolve, reject) => {
      manager.setCookies(cookies, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    return new Promise<any>((resolve, reject) => {
      manager.getOffer(tradeId, (err, offer) => {
        if (err) {
          reject(err);
        } else {
          resolve(offer);
        }
      });
    });
  }

  public async cancelTradeOffer(options) {
    const { tradeId, cookies } = options;
    const manager = new TradeOfferManager({
      language: 'en',
      pollInterval: -1,
    });

    await new Promise<void>((resolve, reject) => {
      manager.setCookies(cookies, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    return new Promise<void>((resolve, reject) => {
      manager.getOffer(tradeId, (err, offer) => {
        if (err) {
          reject(err);
        } else {
          offer.cancel(err => {
            if (err) reject(err);
            else {
              manager.shutdown();
              resolve();
            }
          });
        }
      });
    });
  }

  public async checkTradeOfferLink(tradeOfferLink: string, cookies: string[]) {
    const tradeOfferManager = new TradeOfferManager({
      language: 'en',
      pollInterval: -1,
    });

    await new Promise<void>(resolve => {
      tradeOfferManager.setCookies(cookies, () => {
        resolve();
      });
    });

    const tradeOffer = tradeOfferManager.createOffer(tradeOfferLink);
    await new Promise<void>((resolve, reject) => {
      tradeOffer.getUserDetails(err => {
        if (err) reject(err);
        else resolve();
      });
    });

    tradeOfferManager.shutdown();
  }
}
