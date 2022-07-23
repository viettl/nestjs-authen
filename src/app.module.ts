import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import PostgresDatabaseModule from './database/connect-postgres';

@Module({
  imports: [PostgresDatabaseModule, ConfigModule.forRoot({})],
  controllers: [],
  providers: [],
})
export class AppModule {}
