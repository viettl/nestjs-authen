import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    try {
      const responseMessage =
        this.reflector.get<string>(
          'ResponseMessageKey',
          context.getHandler(),
        ) ?? '';

      return next.handle().pipe(
        map((result) => {
          const { statusCode, data = [], ...rest } = result;
          console.log(rest);
          return {
            data,
            statusCode: statusCode,
            // statusCode: context.switchToHttp().getResponse().statusCode,
            message: responseMessage,
            ...rest,
          };
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
