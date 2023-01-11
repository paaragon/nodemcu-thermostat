/* eslint-disable indent */
import { AppDataSource } from '../db-connector';
import ModeDB from '../entities/mode.db';

export default {
  async getLastMode(): Promise<ModeDB> {
    const result: ModeDB[] = await AppDataSource
      .getRepository(ModeDB)
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
