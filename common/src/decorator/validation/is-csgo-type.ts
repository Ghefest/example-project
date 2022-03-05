import { ValidateBy, ValidationOptions } from "class-validator";
import { CsGoType } from "../../enum";

const csgoTypes = [
  CsGoType.Agent,
  CsGoType.Collectible,
  CsGoType.Container,
  CsGoType.Gift,
  CsGoType.Gloves,
  CsGoType.Graffiti,
  CsGoType.Key,
  CsGoType.Knife,
  CsGoType.Machinegun,
  CsGoType.MusicKit,
  CsGoType.Pass,
  CsGoType.Patch,
  CsGoType.Pistol,
  CsGoType.Rifle,
  CsGoType.SMG,
  CsGoType.Shotgun,
  CsGoType.SniperRifle,
  CsGoType.Sticker,
  CsGoType.Tag,
  CsGoType.Tool,
];

const isCsGoType = (value: unknown) => {
  return typeof value === "string" && csgoTypes.includes(value as CsGoType);
};

export function IsCsGoType(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: "isDota2Rarity",
      validator: {
        validate: (value, args): boolean => isCsGoType(value),
      },
    },
    validationOptions,
  );
}
