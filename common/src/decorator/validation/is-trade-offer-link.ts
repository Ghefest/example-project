import { registerDecorator, ValidationOptions } from "class-validator";

export function IsTradeOfferLink(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: "isTradeOfferLink",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === "string") {
            return value && value.startsWith("https://steamcommunity.com/tradeoffer/new/?partner=") && value.includes("token");
          }

          return false;
        },
      },
    });
  };
}
