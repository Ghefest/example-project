import { ValidateBy, ValidationOptions } from "class-validator";
import { Dota2Rarity } from "../../enum";

const rarities = [
  Dota2Rarity.Ancient,
  Dota2Rarity.Arcana,
  Dota2Rarity.Common,
  Dota2Rarity.Immortal,
  Dota2Rarity.Legendary,
  Dota2Rarity.Mythical,
  Dota2Rarity.Rare,
  Dota2Rarity.Uncommon,
];

export function isDota2Rarity(value: unknown) {
  return typeof value === "string" && rarities.includes(value as Dota2Rarity);
}

export function IsDota2Rarity(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: "isDota2Rarity",
      validator: {
        validate: (value, args): boolean => isDota2Rarity(value),
      },
    },
    validationOptions,
  );
}
