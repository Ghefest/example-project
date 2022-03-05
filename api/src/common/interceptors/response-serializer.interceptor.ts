import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '../classes/http.response';

const IGNORE_RESPONSE_SERIALIZER_KEY = Symbol('ignore_response_serializer');
export function IgnoreResponseSerializer() {
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value[IGNORE_RESPONSE_SERIALIZER_KEY] = true;
  };
}

@Injectable()
export class ResponseSerializerInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isIgnoring = context.getHandler()[IGNORE_RESPONSE_SERIALIZER_KEY];

    if (isIgnoring) {
      return next.handle();
    } else {
      return next.handle().pipe(map(data => new HttpResponse({ isSuccess: true, data })));
    }
  }
}
