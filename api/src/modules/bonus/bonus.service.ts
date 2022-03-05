import { Injectable } from '@nestjs/common';
import { BonusDiscounts } from './bonus.constants';

@Injectable()
export class BonusService {
  public getUserDiscount(salesSum: number) {
    const discountThreshold = Object.keys(BonusDiscounts)
      .map(key => Number(key))
      .reverse()
      .find(discountThreshold => salesSum > discountThreshold);

    return BonusDiscounts[discountThreshold];
  }
}
