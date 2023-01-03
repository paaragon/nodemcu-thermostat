import settedRepo from '../../db/repository/setted.repo';
import { logger } from '../../logger/logger';
import mqttService from '../../services/mqtt.service';
import SetTemperatureRequest from '../schema/SetTemperatureRequest';
import SetTemperatureResponse from '../schema/SetTemperatureResponse';

const log = logger.child({ name: 'thermostat.ctrl.ts' });

export default class ExampleController {
  static async setTemperature(req: SetTemperatureRequest): Promise<SetTemperatureResponse> {
    const { operation } = req.params;

    const current = await settedRepo.getCurrentTemp();

    let currentTemp: number;
    if (current) {
      currentTemp = current.setted;
    } else {
      currentTemp = 20;
    }

    currentTemp += operation === 'increase' ? 1 : -1;

    log.info(`Setting temp ${currentTemp}`);
    mqttService.publish('thermostat/set/grafana', currentTemp.toString());

    return {
      error: false,
      result: 'OK',
    };
  }
}
