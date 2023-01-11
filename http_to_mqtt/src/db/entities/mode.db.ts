/* eslint-disable indent */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mode')
export default class ModeDB {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({ name: 'mode' })
  mode: string;

  @Column({ name: 'date' })
  date: Date;
}
