import modeRepo from '../../db/repository/mode.repo';
import settedRepo from '../../db/repository/setted.repo';
import { logger } from '../../logger/logger';
import mqttService from '../../services/mqtt.service';
import SetTemperatureRequest from '../schema/SetTemperatureRequest';
import SetTemperatureResponse from '../schema/SetTemperatureResponse';

const log = logger.child({ name: 'thermostat.ctrl.ts' });

export default class ExampleController {
  static async setTemperature(req: SetTemperatureRequest): Promise<SetTemperatureResponse> {
    const { temp, petitioner, mode } = req.body;

    log.info(`Setting temp ${temp}`);
    mqttService.publish(`thermostat/set/${petitioner || 'grafana'}`, temp.toString());
    mqttService.publish(`thermostat/setmode/${petitioner || 'grafana'}`, mode.toString());

    return {
      error: false,
      result: 'OK',
    };
  }

  static async getSettedTemperature(): Promise<SetTemperatureResponse> {
    const lastRead = await settedRepo.getLastTemp();
    const lastMode = await modeRepo.getLastMode();


    return {
      error: false,
      result: {
        temp: lastRead?.setted,
        mode: lastMode.mode,
      },
    }
  }
}
