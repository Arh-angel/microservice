import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ENTITIES } from '@lib/entities';

config({ path: join(process.cwd(), '.env') });
const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');
  if (!url) {
    throw new Error('Base url is not empty!');
  }

  return {
    url,
    type: 'postgres',
    schema: 'public',
    entities: ENTITIES,
    migrationsRun: true,
    migrationsTableName: 'migration',
  };
};

export const appDataSource = new DataSource(options());
