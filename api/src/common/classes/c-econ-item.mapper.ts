import { CsGoRarityColor, Dota2RarityColor, Game } from '@pot-back/common';
import { GemsParser } from './gems-parser';
import { StickersParser } from './stickers-parser';

export class CEconItemMapper {
  public static mapToItemInfo(econItem: any) {
    const assetId = econItem.assetid;
    const classId = econItem.classid;
    const instanceId = econItem.instanceid;
    const name = econItem.market_hash_name;
    const nameColor = '#' + econItem.name_color.toLowerCase();
    const image = econItem.getLargeImageURL() ?? econItem.getImageURL() + '256x256';
    let borderColor = '';
    const rarity = econItem.getTag('Rarity')?.name;
    const type = econItem.getTag('Type')?.name;
    const quality = econItem.getTag('Quality')?.name;
    const exterior = econItem.getTag('Quallity')?.name;
    let gems = GemsParser.parse(econItem.descriptions[econItem.descriptions.length - 1]?.value);
    let stickers = StickersParser.parse(econItem.descriptions[econItem.descriptions.length - 1]?.value);

    if (econItem.appid == Game.DOTA2) borderColor = Dota2RarityColor[rarity];
    else if (econItem.appid == Game.CSGO) borderColor = CsGoRarityColor[rarity];

    return {
      assetId,
      classId,
      instanceId,
      name,
      nameColor,
      image,
      borderColor,
      rarity,
      type,
      quality,
      exterior,
      gems,
      stickers,
    };
  }
}
