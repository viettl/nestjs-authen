import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';
import { API_CONFIG_REPOSITORY_TOKEN } from './domain/config.repository';
import { ApiConfigService } from './domain/config.service';
import { ConfigItemEntity } from './typeorm/config-item.entity';
import { TypeormApiConfigRepository } from './typeorm/typeorm.config.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule,
    DatabaseModule,
    TypeOrmModule.forFeature([ConfigItemEntity]),
  ],
  providers: [
    ApiConfigService,
    {
      provide: API_CONFIG_REPOSITORY_TOKEN,
      useClass: TypeormApiConfigRepository,
    },
  ],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
