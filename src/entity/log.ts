import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { LogType } from '../constant';

@Entity()
export class Logs extends BaseEntity {
  @PrimaryGeneratedColumn()
  lid: number;

  @Column()
  type: LogType;

  @Column()
  time: string;

  @Column()
  msg: string;

  @Column()
  key: string;
}
