export interface StickerInfo {
  image: string;
  name: string;
}

export class StickersParser {
  static parse(description: string) {
    const stickers: StickerInfo[] = [];
    if (!description) return stickers;

    description = description.replace(/\"/g, '"');
    let parsed = false;

    while (!parsed) {
      let haveStickers = description.indexOf('name="sticker_info');
      if (haveStickers === -1) {
        parsed = true;
        continue;
      }

      const images = this.parseImages(description);
      const names = this.parseNames(description);
      images.forEach((image, i) => stickers.push({ image, name: names[i] }));

      parsed = true;
    }

    return stickers;
  }

  private static parseImages(description) {
    const images = [];

    let haveImages = true;
    while (haveImages) {
      const haveStart = description.indexOf(`src="`);
      if (haveStart == -1) {
        haveImages = false;
        continue;
      }

      const indexOfUrlStart = description.indexOf(`src="`) + 5;
      const indexOfUrlEnd = description.indexOf(`">`, indexOfUrlStart);
      const image = description.slice(indexOfUrlStart, indexOfUrlEnd);
      images.push(image);
      description = description.slice(indexOfUrlEnd);
    }

    return images;
  }

  private static parseNames(description: string) {
    const indexOfNameStart = description.indexOf(`Sticker:`) + 8;
    const indexOfNameEnd = description.indexOf(`</center>`, indexOfNameStart);
    const names = description.slice(indexOfNameStart, indexOfNameEnd);
    return names.split(',').map(name => name.trim());
  }
}
