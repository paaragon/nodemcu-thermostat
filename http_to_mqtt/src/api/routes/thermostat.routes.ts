import Controller from '../Controller';
import ThermostatController from '../controllers/thermostat.ctrl';
import customExpress from '../lib/customExpress/customExpress';
import authCheck from '../mdw/authCheck';
import SetTemperatureRequest from '../schema/SetTemperatureRequest';

const app = customExpress();

app.post(
    '/temp',
    authCheck,
    Controller.validate(SetTemperatureRequest),
    Controller.run(ThermostatController.setTemperature),
);

app.get(
    '/temp',
    authCheck,
    Controller.run(ThermostatController.getSettedTemperature),
);

export default app;
