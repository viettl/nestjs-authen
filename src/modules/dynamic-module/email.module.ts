import { DynamicModule, Module } from '@nestjs/common';
import EmailService from './email.service';

const EMAIL_CONFIG = 'EMAIL_CONFIG';

// instead of putting our module definition inside the @Module({}) decorator, we can use the static register() method to return a DynamicModule,
// User able to provide EmailOptions as the argument to the register function.
//
@Module({})
export class EmailModule {
  static register(options: any): DynamicModule {
    return {
      module: EmailModule,
      providers: [
        {
          provide: EMAIL_CONFIG,
          useValue: options,
        },
        EmailService,
      ],
      exports: [EmailService],
    };
  }
}
