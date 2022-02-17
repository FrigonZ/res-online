/* eslint-disable import/no-cycle */
import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class Admin extends BaseEntity {
  @PrimaryColumn()
  aid: number;

  @Column()
  password: string;
}
