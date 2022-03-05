export class SellRO {
  private id: number;
  private tradeId?: string;
  private status: number;
  private bot?: {
    name: string;
    avatar: string;
    profileUrl: string;
  };
  private items?: { name: string; image: string }[];
  private givenItem?: { name: string; image: string };
  private acceptTradeUntil?: Date;
  private totalItemsPrice: number;

  constructor(sell) {
    if (!sell) return null;

    this.id = sell.id;
    this.tradeId = sell.tradeId;
    this.status = sell.status;
    this.totalItemsPrice = sell.totalItemsPrice;

    if (sell.bot) {
      this.bot = {
        name: sell.bot.name,
        avatar: sell.bot.avatar,
        profileUrl: sell.bot.profileUrl,
      };
    }

    if (sell.items) this.items = sell.items.splice(0, 3).map(i => ({ name: i.name, image: i.image }));
    if (sell.givenItem) this.givenItem = { name: sell.givenItem.name, image: sell.givenItem.image };
    if (sell.acceptTradeUntil) this.acceptTradeUntil = sell.acceptTradeUntil;
  }
}
