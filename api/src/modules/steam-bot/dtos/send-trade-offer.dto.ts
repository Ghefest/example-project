import { SteamEconItem } from '../steam-bot.interfaces';

export class SendTradeOfferDTO {
  public accountName: string;
  public tradeOfferLink: string;
  public theirItems: SteamEconItem[];
  public giveTF2Item?: boolean;
}
