/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDish, OrderStatus } from '../constant';
import { User } from './user';

export interface OrderProps {
  status: OrderStatus;
  dishes: OrderDish[];
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  oid: number;

  @Column()
  time: Date;

  @Column()
  status: OrderStatus;

  @Column()
  uid: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'uid' })
  user: User;

  public static generateOrder = (props: OrderProps) => {
    const order = new Order();
    order.status = props.status;
  };
}
