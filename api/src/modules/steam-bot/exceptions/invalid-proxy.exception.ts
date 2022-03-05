import { I18nExceptionTranslateContext } from '../../../common/decorators/i18n-exception-translate-context.decorator';
import { DomainException } from '../../../common/exceptions/domain.exception';

interface InvalidProxyExceptionArgs {
  proxy: string;
}

@I18nExceptionTranslateContext('steam-bot')
export class InvalidProxyException extends DomainException {
  constructor(args: InvalidProxyExceptionArgs) {
    super(args);
  }
}
