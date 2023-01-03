/* eslint-disable indent */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('setted')
export default class SettedDB {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({ name: 'setted' })
  setted: number;

  @Column({ name: 'date' })
  date: Date;
}
