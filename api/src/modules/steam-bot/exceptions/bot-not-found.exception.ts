import { I18nExceptionTranslateContext } from '../../../common/decorators/i18n-exception-translate-context.decorator';
import { DomainException } from '../../../common/exceptions/domain.exception';

interface BotNotFoundExceptionArgs {
  accountName: string;
}

@I18nExceptionTranslateContext('steam-bot')
export class BotNotFoundException extends DomainException {
  constructor(args: BotNotFoundExceptionArgs) {
    super(args);
  }
}
