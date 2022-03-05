import { I18nExceptionTranslateContext } from '../../../common/decorators/i18n-exception-translate-context.decorator';
import { DomainException } from '../../../common/exceptions/domain.exception';

@I18nExceptionTranslateContext('sell')
export class CannotCancelSellException extends DomainException {}
