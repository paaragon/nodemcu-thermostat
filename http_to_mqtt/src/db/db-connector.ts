import config from 'config';
import { DataSource } from 'typeorm';
import { ConfigLogI, ConfigPostgresI } from '../config';
import TypeOrmLogger from './TypeOrmLogger';

const dbConfig = config.get<ConfigPostgresI>('db');
const logConfig = config.get<ConfigLogI>('log');

export const AppDataSource = new DataSource({
  name: 'default',

  type: 'postgres',
  database: dbConfig.db,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  ssl: false,
  extra: {
    max: dbConfig.maxConnections,
  },
  synchronize: false,
  logger: new TypeOrmLogger(),
  maxQueryExecutionTime: dbConfig.queryAlertTime,
  logging: logConfig.level === 'debug',
  entities: [
    `${__dirname}/entities/*.{ts,js}`,
  ],
});

export default {
  init: async () => {
    await AppDataSource.initialize();
  },
};
