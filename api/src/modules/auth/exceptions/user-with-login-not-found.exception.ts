import { I18nExceptionTranslateContext } from '../../../common/decorators/i18n-exception-translate-context.decorator';
import { DomainException } from '../../../common/exceptions/domain.exception';

interface UserWithLoginNotFoundExceptionProps {
  login: string;
}

@I18nExceptionTranslateContext('auth')
export class UserWithLoginNotFoundException extends DomainException {
  constructor(data: UserWithLoginNotFoundExceptionProps) {
    super(data);
  }
}
