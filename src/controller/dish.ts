import { UpdateResult } from 'typeorm';
import { Ctx } from '../constant';
import { Dish, DishProps } from '../entity/dish';
import { logError } from '../utils/logger';
import { ResponseWrap } from '../utils/response';

const KEY = 'controller.dish';

export const getAll = async (ctx: Ctx) => {
  try {
    const dishList = await Dish.find();
    ResponseWrap.success(ctx, {
      dishList,
    });
  } catch (error) {
    logError(`${KEY}.getAll`, error);
    ResponseWrap.error(ctx);
  }
};

export const update = async (ctx: Ctx) => {
  try {
    const { dish } = ctx.request.body;
    if (!dish) {
      ResponseWrap.fail(ctx, '缺少dish');
      return;
    }

    const { did } = dish;
    const result: UpdateResult = await Dish.update(
      did,
      Dish.getPortail(dish) as any
    );

    if (result.affected !== 1) {
      ResponseWrap.fail(ctx, '修改失败');
      return;
    }

    ResponseWrap.success(ctx, {});
  } catch (error) {
    logError(`${KEY}.update`, error, ctx.request.body);
    ResponseWrap.error(ctx);
  }
};

export const create = async (ctx: Ctx) => {
  try {
    const { dishes } = ctx.request.body;
    if (!dishes || !dishes.length) {
      ResponseWrap.fail(ctx, '缺少dishes');
      return;
    }

    const insertDishes = dishes.map((dish: DishProps) => {
      return Dish.generateDish(dish);
    });
    const result = await Dish.insert(insertDishes);
    if (result.identifiers.length === 0) {
      ResponseWrap.fail(ctx, '添加失败');
      return;
    }

    ResponseWrap.success(ctx, {});
  } catch (error) {
    logError(`${KEY}.create`, error, ctx.request.body);
    ResponseWrap.error(ctx);
  }
};
