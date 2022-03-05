import { IsDefined, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { Game } from "../../enum";
import { CustomValidationDecoratorOptions } from "../../interface";

export function IsGameEnum(options?: CustomValidationDecoratorOptions): PropertyDecorator {
  return function(target: any, propertyKey: string | symbol): void {
    IsNotEmpty()(target, propertyKey);
    IsIn([Game.CSGO, Game.DOTA2, Game.TF2])(target, propertyKey);

    if (options && !options.required) {
      IsOptional()(target, propertyKey);
    } else {
      IsDefined()(target, propertyKey);
    }
  };
}
