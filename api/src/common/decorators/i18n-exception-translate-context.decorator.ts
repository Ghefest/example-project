export function I18nExceptionTranslateContext(context: string) {
  return function(constructor: Function) {
    constructor.prototype.I18nTranslateContext = context;
  };
}
