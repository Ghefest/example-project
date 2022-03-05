import { I18nExceptionTranslateContext } from '../../../common/decorators/i18n-exception-translate-context.decorator';
import { DomainException } from '../../../common/exceptions/domain.exception';

interface BotDontHaveItemsExceptionArgs {
  gameName: string;
}

@I18nExceptionTranslateContext('steam-bot')
export class BotDontHaveItemsException extends DomainException {
  constructor(args: BotDontHaveItemsExceptionArgs) {
    super(args);
  }
}
