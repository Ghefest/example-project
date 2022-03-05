import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const MAP_TO_KEY = Symbol('map_to');
export function MapTo(mapTo) {
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value[MAP_TO_KEY] = mapTo;
  };
}

@Injectable()
export class MapperInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const mapTo = context.getHandler()[MAP_TO_KEY];

    if (mapTo) {
      return next.handle().pipe(map(data => new mapTo(data)));
    } else {
      return next.handle();
    }
  }
}
