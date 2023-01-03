import config from 'config';
import dotenv from 'dotenv';
import 'reflect-metadata';
import Server from './api/server';
import dbConnection from './db/db-connector';
import { ConfigApiI } from './config';
import { logger } from './logger/logger';
import mqttService from './services/mqtt.service';

dotenv.config();

const log = logger.child({ name: 'app.ts' });
log.info('Starting app...');

(async () => {
  try {
    const port = normalizePort(process.env.PORT, config.get<ConfigApiI>('api').port);

    log.info('Connecting database...');
    await dbConnection.init();
    log.info('Database connected');

    log.info('Connecting mqtt...');
    await mqttService.connect();
    log.info('Mqtt connected');

    log.info('Starting server...');
    const server = new Server(port);
    await server.start();
    log.info('Server started');

    log.info('application started');
  } catch (e) {
    log.error(e);
    process.exit(1);
  }
})();

function normalizePort(val: string, defaultVal: number): number {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return defaultVal;
  }

  if (port >= 0) {
    return port;
  }

  return defaultVal;
}
