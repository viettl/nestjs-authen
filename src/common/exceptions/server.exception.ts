import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import 'dotenv/config';

export const getStatusCode = <T>(exception: T): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = <T>(exception: T): string => {
  return exception instanceof HttpException
    ? exception['response']['message']
    : String(exception);
};

@Catch()
export class HttpErrorFilter<T> implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  catch(exception: T, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // const message =
    //   exception instanceof HttpException
    //     ? exception.message || exception.message?.error
    //     : 'Internal server error';

    // console.log({ exception }, exception.res);

    const message =
      exception instanceof HttpException
        ? exception?.getResponse()?.['message']
          ? exception?.getResponse()?.['message']
          : exception['message']
        : 'Internal server error';

    const errorMessage = getErrorMessage<T>(exception);
    const errorStatusCode = getStatusCode<T>(exception);

    const devErrorResponse: any = {
      statusCode: errorStatusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      // errorName: exception?.name,
      message: errorMessage,
    };

    const prodErrorResponse: any = {
      statusCode,
      message,
    };
    this.logger.log(
      `request method: ${request.method} request url${request.url}`,
      JSON.stringify(devErrorResponse),
    );
    response
      .status(statusCode)
      .json(
        process.env.NODE_ENV === 'development'
          ? devErrorResponse
          : prodErrorResponse,
      );
  }
}
