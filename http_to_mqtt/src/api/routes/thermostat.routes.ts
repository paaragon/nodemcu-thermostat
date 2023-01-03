import Controller from '../Controller';
import ThermostatController from '../controllers/thermostat.ctrl';
import customExpress from '../lib/customExpress/customExpress';
import authCheck from '../mdw/authCheck';
import SetTemperatureRequest from '../schema/SetTemperatureRequest';

const app = customExpress();

app.post(
    '/temp/:operation',
    authCheck,
    Controller.validate(SetTemperatureRequest),
    Controller.run(ThermostatController.setTemperature),
);

export default app;
