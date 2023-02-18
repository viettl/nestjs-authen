import { PermissionsModule } from './modules/permissions/permissions.module';
import { AuthModule } from './modules/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import PostgresDatabaseModule from './database/connect-postgres';
import { winstonOptions } from './utils/log';
import { UserModule } from './modules/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './common/exceptions/server.exception';
import { TransformInterceptor } from '@/common/interceptors/response.interceptor';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    PostgresDatabaseModule,
    UserModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    ConfigModule.forRoot({}),
    WinstonModule.forRoot(winstonOptions),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
