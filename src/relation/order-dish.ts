/* eslint-disable import/no-cycle */
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

export interface ODProps {
  dish: Dish;
  option: DishOption;
}

@Entity()
export class OrderDish extends BaseEntity {
  @PrimaryColumn()
  oid: number;

  @ManyToOne(() => Order, (order) => order.dishes)
  @JoinColumn({ name: 'oid' })
  order: Order;

  @PrimaryColumn()
  did: number;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: 'did' })
  dish: Dish;

  @Column({ type: 'simple-json' })
  option: DishOption;

  public static generateOrderDish = (props: ODProps) => {
    const { dish, option } = props;
    const orderDish = new OrderDish();
    orderDish.dish = dish;
    orderDish.option = option;
    return orderDish;
  };
}
