import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { DishOption } from '../constant';
import { Dish } from '../entity/dish';
import { Order } from '../entity/order';

@Entity()
export class OrderDish extends BaseEntity {
  @PrimaryColumn()
  oid: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'oid' })
  order: Order;

  @PrimaryColumn()
  did: number;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'did' })
  dish: Dish;

  @Column({ type: 'simple-json' })
  option: DishOption;
}
