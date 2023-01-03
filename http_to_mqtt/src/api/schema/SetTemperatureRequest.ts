import { Request as ExpressRequest } from 'express';
import HttpException from '../exceptions/HttpException';
import Request from './Request';

export default class SetTemperatureRequest extends Request {
  body: {
    temp: number,
    petitioner?: string
  }

  constructor() {
    super();
  }

  public validate(req: ExpressRequest): boolean {
    if (!req.body.temp) {
      throw new HttpException(400, 'Invalid temp');
    }

    return true;
  }
}
