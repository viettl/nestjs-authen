import { AuthModule } from './modules/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import PostgresDatabaseModule from './database/connect-postgres';
import { winstonOptions } from './utils/log';
import { UserModule } from './modules/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './common/exceptions/server.exception';

@Module({
  imports: [
    PostgresDatabaseModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({}),
    WinstonModule.forRoot(winstonOptions),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
