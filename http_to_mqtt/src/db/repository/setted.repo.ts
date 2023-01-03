/* eslint-disable indent */
import { AppDataSource } from '../db-connector';
import SettedDB from '../entities/setted.db';

export default {
  async getCurrentTemp(): Promise<SettedDB> {
    const result: SettedDB[] = await AppDataSource
      .getRepository(SettedDB)
      .find({
        order: {
          date: 'DESC',
        },
        take: 1,
      });

    if (result.length < 1) {
      return null;
    }

    return result[0];
  },
};
