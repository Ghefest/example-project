import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { HttpResponse } from '../classes/http.response';
import { DomainException } from '../exceptions/domain.exception';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService, private i18nService: I18nService) {}

  async catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request & { i18nLang: string }>();
    const response = ctx.getResponse<Response>();

    // @ts-ignore
    let translateKey = exception.I18nTranslateContext + '.';
    translateKey += exception.constructor.name
      .replace('Exception', '')
      .match(/[A-Z][a-z]+/g)
      .map(string => string.toUpperCase())
      .join('_');
    const args = exception.getData();

    const message = await this.i18nService.translate(translateKey, { lang: request.i18nLang, args });
    const httpResponse = new HttpResponse({
      message,
      status: HttpStatus.BAD_REQUEST,
    });

    response.status(HttpStatus.OK).json(httpResponse);
    this.logger.log(
      { message, url: request.originalUrl, method: request.method, stack: exception.stack },
      DomainExceptionFilter.name,
    );
  }
}
