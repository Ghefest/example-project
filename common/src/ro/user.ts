import { ApiResponseProperty } from "@nestjs/swagger";

export class GetMeRO {
  private id: number;
  private username: string;
  private avatar: string;
  private balance: number;
  private tradeOfferLink: string;
  private steamId64: string;
  private email: string;
  private telegramTag: string;
  private referralCode: string;
  private referrerId?: number;
  private createdAt: Date;
  private countryCode?: string;
  private savedPayoutProvider?: string;
  private savedPayoutEmail?: string;
  private savedPayoutPurse?: string;

  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.avatar = user.avatar;
    this.balance = user.balance;
    this.tradeOfferLink = user.tradeOfferLink;
    this.email = user.email ? this.replaceEmailWithStars(user.email) : user.email;
    this.steamId64 = user.steamId64;
    this.telegramTag = user.telegramTag ? this.replaceTelegramTagWithStars(user.telegramTag) : user.telegramTag;
    this.referralCode = user.referralCode;
    this.referrerId = user.referrerId || null;
    this.createdAt = user.createdAt;
    this.countryCode = user.countryCode;
    this.savedPayoutProvider = user.savedPayoutProvider;
    this.savedPayoutEmail = user.savedPayoutEmail;
    this.savedPayoutPurse = user.savedPayoutPurse;
  }

  private replaceTelegramTagWithStars(tag: string) {
    return this.replaceAllBetweenTwoPositions(tag, 1, tag.length - 1);
  }

  private replaceEmailWithStars(email: string) {
    const dogPosition = email.indexOf("@");
    const dotPosition = email.lastIndexOf(".");

    const replaceAllExceptFirstBeforePosition = (string: string, position: number) => {
      const splitted = string.split("");
      const beforePosition = position - 1;
      const replacers = Array(beforePosition).fill("*");

      splitted.splice(1, beforePosition, ...replacers);
      return splitted.join("");
    };

    email = replaceAllExceptFirstBeforePosition(email, dogPosition);
    return this.replaceAllBetweenTwoPositions(email, dogPosition + 2, dotPosition);
  }

  private replaceAllBetweenTwoPositions(string: string, start: number, end: number) {
    const splitted = string.split("");
    const replacers = Array(end - start).fill("*");

    splitted.splice(start, end - start, ...replacers);
    return splitted.join("");
  }
}
