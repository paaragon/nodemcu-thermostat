import { Request as ExpressRequest } from 'express';
import HttpException from '../exceptions/HttpException';
import Request from './Request';

export default class SetTemperatureRequest extends Request {
  params: {
    operation: 'increase' | 'decrease';
  };

  constructor() {
    super();
  }

  public validate(req: ExpressRequest): boolean {
    if (!req.params.operation && !['increase', 'decrease'].includes(req.params.operation)) {
      throw new HttpException(400, 'Invalid operation');
    }

    return true;
  }
}
