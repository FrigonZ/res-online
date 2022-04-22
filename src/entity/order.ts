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
  seat: string;
}

const formatTime = (date: Date): string =>
  `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

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

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'uid' })
  user: User;

  @Column({
    type: 'simple-json',
  })
  dishes: OrderDish[];

  formatDate: string;

  public static generateOrder = (props: OrderProps) => {
    const order = new Order();
    const { status = OrderStatus.ON_PROCESS, seat } = props;
    order.status = status;
    order.time = new Date();
    order.seat = seat;
    return order;
  };

  public format = () => {
    this.formatDate = formatTime(this.time);
  };
}
