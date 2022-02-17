/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from '../constant';
import { OrderDish } from '../relation/order-dish';
import { User } from './user';

export interface OrderProps {
  status: OrderStatus;
  seat: string;
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
  seat: string;

  @Column()
  uid: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'uid' })
  user: User;

  @OneToMany(() => OrderDish, (orderDish) => orderDish.order)
  dishes: OrderDish[];

  public static generateOrder = (props: OrderProps) => {
    const order = new Order();
    const { status = OrderStatus.ON_PROCESS, seat } = props;
    order.status = status;
    order.time = new Date();
    order.seat = seat;
    return order;
  };
}
