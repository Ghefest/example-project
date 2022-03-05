import { I18nExceptionTranslateContext } from '../../../common/decorators/i18n-exception-translate-context.decorator';
import { DomainException } from '../../../common/exceptions/domain.exception';

interface UncaughtSteamErrorExceptionArgs {
  message: string;
}

@I18nExceptionTranslateContext('steam-bot')
export class UncaughtSteamErrorException extends DomainException {
  constructor(args: UncaughtSteamErrorExceptionArgs) {
    super(args);
  }
}
