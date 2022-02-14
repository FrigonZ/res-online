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

  @Column()
  price: number;

  @Column()
  pic: string;

  @Column()
  desc: string;

  @Column()
  options: string;

  @Column()
  isNecessary: boolean;

  @Column()
  status: DishStatus;

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
    dish.options = JSON.stringify(options);
    dish.isNecessary = isNecessary;
    dish.status = status;
    return dish;
  }

	/** 获取餐品自定义信息 */
  public getOptions = (): DishOption[] => {
    return JSON.parse(this.options);
  };
}
