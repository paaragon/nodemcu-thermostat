import config from 'config';
import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';
import { MqttConfigI } from '../config';
let client: MqttClient = null;

const mqttConfig = config.get<MqttConfigI>('mqtt');

export function connect(): Promise<void> {
  return new Promise<void>((res, rej) => {
    client = mqtt.connect(`mqtt://${mqttConfig.host}`);
    client.on('connect', () => {
      res();
    })
  });
}

export function publish(topic: string, payload: string) {
  client.publish(topic, payload);
}

export default {
  connect,
  publish,
}
