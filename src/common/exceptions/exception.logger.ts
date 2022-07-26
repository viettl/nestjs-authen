import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export default class ExceptionsLogger extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    if (host.getType() === 'http') {
      console.log('Request: ');

      // do something that is only important in the context of regular HTTP requests (REST)
    } else if (host.getType() === 'rpc') {
      console.log('Request: ');

      // do something that is only important in the context of Microservice requests
    }
    // else if (host.getType<GqlContextType>() === 'graphql') {
    // do something that is only important in the context of GraphQL requests
    // }
    super.catch(exception, host);
  }
}
