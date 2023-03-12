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
import { ScheduleModule } from '@nestjs/schedule';
import { RolePermissionModule } from '@/modules/role-permission/role-permisison.module';
// import { CronModule } from './modules/cronjob/cron.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    // call initialize schedule.
    // It also registers any declarative cron jobs, timeouts, and intervals existing within
    // out application context
    PostgresDatabaseModule,
    UserModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    RolePermissionModule,
    ConfigModule.forRoot({}),
    WinstonModule.forRoot(winstonOptions),
    // CronModule,
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
