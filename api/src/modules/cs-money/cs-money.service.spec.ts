import { HttpModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { sleep } from '../../common/functions/sleep';
import { CsMoneyService } from './cs-money.service';

describe('CsMoneyService', () => {
  let csMoneyService: CsMoneyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CsMoneyService],
    }).compile();

    csMoneyService = moduleRef.get(CsMoneyService);
  });

  afterEach(async () => {
    await sleep(100);
  });

  describe('getSkinsList', () => {
    it('should return an object with property items for 730 appId', async () => {
      const options = { appId: 730, offset: 0, limit: 60, rarity: 'Classified' };
      const skinsList = await csMoneyService.getSkinsList(options);

      expect(skinsList).toHaveLength(60);
      skinsList.forEach(skin => {
        expect(skin).toHaveProperty('appId', 730);
        expect(skin).toHaveProperty('price');
        expect(skin).toHaveProperty('nameId');
      });
    });

    it('should return an object with property items for 570 appId', async () => {
      const options = { appId: 570, offset: 0, limit: 60, rarity: 7 };
      const skinsList = await csMoneyService.getSkinsList(options);

      expect(skinsList).toHaveLength(60);
      skinsList.forEach(skin => {
        expect(skin).toHaveProperty('appId', 570);
        expect(skin).toHaveProperty('price');
        expect(skin).toHaveProperty('nameId');
      });
    });

    it('should throw error if limit is not 60', async () => {
      const t = async () => {
        const options = { appId: 730, offset: 0, limit: 70, rarity: 'Classified' };
        await csMoneyService.getSkinsList(options);
      };

      await expect(t).rejects.toThrow();
    });

    it('should throw `End of skins list.`', async () => {
      const t = async () => {
        const options = { appId: 570, offset: 100_000, limit: 60, rarity: 7 };
        await csMoneyService.getSkinsList(options);
      };

      await expect(t).rejects.toThrow('End of skins list.');
    });
  });

  describe('getSkinInfo', () => {
    it('return an object with fullName, defaultPrice for 730 appId', async () => {
      const skinsList = await csMoneyService.getSkinsList({ appId: 730, limit: 60, offset: 0, rarity: 'Classified' });
      const skinInfo = await csMoneyService.getSkinInfo({ appId: 730, id: skinsList[0].id });

      expect(skinInfo).toBeDefined();
      expect(skinInfo).toHaveProperty('defaultPrice');
      expect(skinInfo).toHaveProperty('fullName');
    }, 10_000);

    it('return an object with fullName, defaultPrice for 570 appId', async () => {
      const skinsList = await csMoneyService.getSkinsList({ appId: 570, limit: 60, offset: 0, rarity: 7 });
      const skinInfo = await csMoneyService.getSkinInfo({ appId: 570, id: skinsList[0].id });

      expect(skinInfo).toBeDefined();
      expect(skinInfo).toHaveProperty('defaultPrice');
      expect(skinInfo).toHaveProperty('fullName');
    }, 10_000);
  });
});
