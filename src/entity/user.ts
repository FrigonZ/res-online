/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Order } from './order';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  openid: string;

  @Column()
  admin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
