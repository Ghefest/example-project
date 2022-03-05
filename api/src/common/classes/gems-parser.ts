export interface GemInfo {
  image: string;
  name: string;
  desc: string;
}

export class GemsParser {
  static parse(description: string) {
    const gems: GemInfo[] = [];
    if (!description) return gems;

    description = description.replace(/\"/g, '"');
    let parsed = false;

    while (!parsed) {
      let parsedImage = this.parseImage(description);
      if (!parsedImage.image) {
        parsed = true;
        continue;
      }

      description = parsedImage.newDescription;
      let parsedName = this.parseName(description);
      if (!parsedName.name) {
        parsed = true;
        continue;
      }

      description = parsedName.newDescription;
      let parsedDesc = this.parseDesc(description);
      if (!parsedDesc.desc) {
        parsed = true;
        continue;
      }

      description = parsedDesc.newDescription;
      gems.push({ image: parsedImage.image, name: parsedName.name, desc: parsedDesc.desc });
    }

    return gems;
  }

  static parseImage(description) {
    const indexOfUrlStart = description.indexOf('url(') + 4;
    const indexOfUrlEnd = description.indexOf(')', indexOfUrlStart);
    const image = description.slice(indexOfUrlStart, indexOfUrlEnd);
    return { image, newDescription: description.slice(indexOfUrlEnd) };
  }

  static parseName(description) {
    const indexOfSpan = description.indexOf('span');
    const indexOfNameStart = description.indexOf(`)">`, indexOfSpan) + 3;
    const indexOfNameEnd = description.indexOf(`</`, indexOfNameStart);
    const name = description.slice(indexOfNameStart, indexOfNameEnd);
    return { name, newDescription: description.slice(indexOfNameEnd) };
  }

  static parseDesc(description) {
    const indexOfDescStart = description.indexOf(`12px">`) + 6;
    const indexOfDescEnd = description.indexOf(`</s`, indexOfDescStart);
    const desc = description.slice(indexOfDescStart, indexOfDescEnd);
    return { desc, newDescription: description.slice(indexOfDescEnd) };
  }
}
