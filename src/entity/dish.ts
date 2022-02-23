import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { DishOption, DishStatus } from '../constant';

export interface DishProps {
  /** 餐品名 */
  name: string;
  /** 餐品价格 */
  price: number;
  /** 餐品图片 */
  pic?: string;
  /** 餐品描述 */
  desc?: string;
  /** 餐品自定义 */
  options?: DishOption[];
  /** 是否为必选品 */
  isNecessary?: boolean;
  /** 餐品状态 */
  status?: DishStatus;
}

/** 餐品 */
@Entity()
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn()
  did: number;

  @Column()
  name: string;

  @Column({ type: 'double' })
  price: number;

  @Column()
  pic: string;

  @Column()
  desc: string;

  @Column({
    type: 'simple-json',
  })
  options: DishOption[];

  @Column()
  isNecessary: boolean;

  @Column()
  status: DishStatus;

  @Column()
  time: Date;

  /** 生成餐品信息，避免override构造器影响orm */
  public static generateDish(props: DishProps): Dish {
    const {
      name,
      price,
      pic = '',
      desc = '',
      options = [],
      isNecessary = false,
      status = DishStatus.NORMAL,
    } = props;
    const dish = new Dish();
    dish.name = name;
    dish.price = price;
    dish.pic = pic;
    dish.desc = desc;
    dish.options = options;
    dish.isNecessary = isNecessary;
    dish.status = status;
    dish.time = new Date();
    return dish;
  }

  /** 获取修改餐品信息数据 */
  public static getPortail = (props: Partial<DishProps>) => {
    return {
      ...props,
      time: new Date(),
    };
  };
}
