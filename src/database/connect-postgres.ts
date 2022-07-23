import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configs: ConfigService) => ({
        type: 'postgres',
        port: configs.get('POSTGRES_PORT'),
        username: configs.get('POSTGRES_USER'),
        password: configs.get('POSTGRES_PASSWORD'),
        database: configs.get('POSTGRES_DB'),
        entities: [__dirname + '/../**/entities/*{.ts}'],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
})
export default class PostgresDatabaseModule {}
