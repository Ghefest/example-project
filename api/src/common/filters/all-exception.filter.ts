import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpResponse } from '../classes/http.response';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  async catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const message = 'Internal server error';
    const httpResponse = new HttpResponse({
      message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });

    response.status(HttpStatus.OK).json(httpResponse);
    this.logger.log(
      { message: exception.message, url: request.originalUrl, method: request.method, stack: exception.stack },
      AllExceptionFilter.name,
    );
  }
}
