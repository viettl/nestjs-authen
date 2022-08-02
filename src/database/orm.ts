import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { $npmConfigName1659017881377 } from './migrations/1659017881377-$npm_config_name';
// import { $npmConfigName1659002876929 } from './migrations/1659002876929-$npm_config_name';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [__dirname + '/../**/entities/*{.ts,.js}'],
  migrations: [$npmConfigName1659017881377],
  logging: true,
});
