import { HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Game } from '@pot-back/common';
import { CsMoneyService } from '../cs-money/cs-money.service';
import { CsMoneyPricesConsumer } from './cs-money-prices.consumer';
import { CsMoneyPricesService } from './cs-money-prices.sevice';

const csMoneyServiceFactoryMock = jest.fn(() => ({
  skinsList: Array.from({ length: 420 }, (_, id) => ({
    id,
    appId: 570,
    nameId: id,
    fullName: `${id}`,
    defaultPrice: id,
  })),
  getSkinsList: function({ offset, limit }) {
    const skins = this.skinsList.slice(offset, offset + limit);
    if (offset >= this.skinsList.length) return Promise.reject(new Error('End of skins list.'));
    return Promise.resolve(skins);
  },
  getSkinInfo: function({ id }) {
    return this.skinsList.find(skin => skin.id === id);
  },
}));

const csMoneyPricesServiceFactoryMock = jest.fn(() => ({
  items: [],
  save: async function(s) {
    this.items.push(...s);
    return s;
  },
}));

describe('CsMoneyPricesConsumer', () => {
  let csMoneyPricesConsumer: CsMoneyPricesConsumer;
  let csMoneyService: Partial<CsMoneyService>;
  let csMoneyPricesService: Partial<CsMoneyPricesService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: HttpService, useValue: { get: () => [] } },
        { provide: CsMoneyService, useFactory: csMoneyServiceFactoryMock },
        { provide: CsMoneyPricesService, useFactory: csMoneyPricesServiceFactoryMock },
        CsMoneyPricesConsumer,
      ],
    }).compile();

    csMoneyPricesConsumer = moduleRef.get(CsMoneyPricesConsumer);
    csMoneyService = moduleRef.get(CsMoneyService);
    csMoneyPricesService = moduleRef.get(CsMoneyPricesService);
  });

  describe('updatePrices', () => {
    it('should save info about every skin, log, update progress', async () => {
      const job = {
        logs: [],
        log: function(log) {
          this.logs.push(log);
        },
        data: {
          game: Game.CSGO,
          payload: {
            rarity: 'Classified',
            offsetEnd: 120,
          },
        },
        currentProgress: 0,
        progress: function(value) {
          value && (this.currentProgress += value);
        },
      };

      const csMoneyServiceGetSkinsListSpy = jest.spyOn(csMoneyService, 'getSkinsList');
      const csMoneyServiceGetSkinInfoSpy = jest.spyOn(csMoneyService, 'getSkinInfo');
      const csMoneyPricesServiceSaveSpy = jest.spyOn(csMoneyPricesService, 'save');
      const jobLogSpy = jest.spyOn(job, 'log');
      const jobProgressSpy = jest.spyOn(job, 'progress');

      // @ts-ignore
      await csMoneyPricesConsumer.updatePrices(job);

      expect(csMoneyServiceGetSkinsListSpy).toBeCalledTimes(2);
      expect(csMoneyServiceGetSkinInfoSpy).toBeCalledTimes(120);
      expect(csMoneyPricesServiceSaveSpy).toBeCalledTimes(120);
      expect(jobLogSpy).toBeCalledTimes(121);
      expect(jobProgressSpy).toBeCalledTimes(3);

      const isLogsIncludeUpdatedLog = job.logs.some(log => log.includes('Updated'));
      expect(isLogsIncludeUpdatedLog).toBe(true);
    });

    it('should exit before hit offsetEnd', async () => {
      const job = {
        logs: [],
        log: function(log) {
          this.logs.push(log);
        },
        data: {
          game: Game.CSGO,
          payload: {
            rarity: 'Classified',
            offsetEnd: 480,
          },
        },
        currentProgress: 0,
        progress: function(value) {
          value && (this.currentProgress += value);
        },
      };

      const csMoneyServiceGetSkinsListSpy = jest.spyOn(csMoneyService, 'getSkinsList');
      const csMoneyServiceGetSkinInfoSpy = jest.spyOn(csMoneyService, 'getSkinInfo');
      const csMoneyPricesServiceSaveSpy = jest.spyOn(csMoneyPricesService, 'save');
      const jobLogSpy = jest.spyOn(job, 'log');
      const jobProgressSpy = jest.spyOn(job, 'progress');

      // @ts-ignore
      await csMoneyPricesConsumer.updatePrices(job);

      expect(csMoneyServiceGetSkinsListSpy).toBeCalledTimes(480 / 60);
      expect(csMoneyServiceGetSkinInfoSpy).toBeCalledTimes(420);
      expect(csMoneyPricesServiceSaveSpy).toBeCalledTimes(420);
      expect(jobLogSpy).toBeCalledTimes(421);
      expect(jobProgressSpy).toBeCalledTimes(420 / 60 + 1);

      const isLogsIncludeUpdatedLog = job.logs.some(log => log.includes('Updated'));
      expect(isLogsIncludeUpdatedLog).toBe(true);
    });
  });
});
