import config from 'config';
import cors from 'cors';
import express from 'express';
import httpContext from 'express-http-context';
import { ConfigApiI } from '../config';
import { logger } from '../logger/logger';
import customExpress, { CustomExpress } from './lib/customExpress/customExpress';
import accessLogger from './mdw/accessLogger';
import errorHandler from './mdw/errorHandler';
import methodNotAllowed from './mdw/methodNotAllowed';
import notFound from './mdw/notFound';
import requestUuid from './mdw/requestUuid';
import thermostatRoutes from './routes/thermostat.routes';
import healthRoutes from './routes/health.routes';

const log = logger.child({ name: 'server.ts' });

export default class Server {
  private app: CustomExpress;

  constructor(
        public port: number,
  ) {
    const customExpressLog = log.child({ name: 'customExpress' });
    this.app = customExpress({
      log: customExpressLog.info.bind(customExpressLog),
    });

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(httpContext.middleware);
    this.app.use(requestUuid);
    this.app.use(accessLogger);
    this.initRoutes();
    this.app.use(methodNotAllowed(this.app));
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  private initRoutes() {
    this.app.use('/health', healthRoutes);
    this.app.use(`/api/v${config.get<ConfigApiI>('api').version}/thermostat`, thermostatRoutes);
  }

  async start() {
    return new Promise<void>((res, rej) => {
      this.app.listen(this.port, () => {
        this.app.printEndpoints();
        log.info(`Server is listening on port ${this.port}`);
        res();
      });
    });
  }
}
