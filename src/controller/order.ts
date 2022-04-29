import { Ctx, DishOption, OrderDish, OrderStatus } from '../constant';
import { Dish } from '../entity/dish';
import { Order } from '../entity/order';
import { User } from '../entity/user';
import { ResponseWrap } from '../utils/response';
import { broadcastOrder, checkBusi } from '../websocket';

const PAGE = 10;

export const getAll = async (ctx: Ctx) => {
  try {
    const { page } = ctx.params;
    if (!page) {
      const orders = await Order.find();
      orders.forEach((order) => order.format());
      ResponseWrap.success(ctx, { orders });
      return;
    }
    const orders = await Order.find({
      skip: (Number(page) - 1) * PAGE,
      take: PAGE,
    });
    orders.forEach((order) => order.format());
    ResponseWrap.success(ctx, { orders });
  } catch (error) {
    ResponseWrap.error(ctx);
  }
};

export const getByUser = async (ctx: Ctx) => {
  try {
    const { user: userInfo } = ctx.request.body;
    const user = await User.findOne(userInfo);
    if (!user) {
      ResponseWrap.fail(ctx, '无效用户');
    }
    const { uid } = user;

    const orders = await Order.find({ uid });
    ResponseWrap.success(ctx, { orders });
  } catch (error) {
    ResponseWrap.error(ctx);
  }
};

export const getById = async (ctx: Ctx) => {
  try {
    const { oid } = ctx.params;
    const orders = await Order.findByIds([oid]);
    if (!orders.length) {
      ResponseWrap.fail(ctx);
      return;
    }
    ResponseWrap.success(ctx, { order: orders[0] });
  } catch (error) {
    ResponseWrap.error(ctx);
  }
};

export const create = async (ctx: Ctx) => {
  try {
    if (!checkBusi()) {
      ResponseWrap.fail(ctx, '店铺休息中');
      return;
    }
    const { order, dishes, user: userInfo } = ctx.request.body || {};
    const user = await User.findOne(userInfo);
    if (!user) {
      ResponseWrap.fail(ctx, '无效用户');
      return;
    }

    if (!order) {
      ResponseWrap.fail(ctx, '缺少order');
      return;
    }
    const target = Order.generateOrder(order);
    let price = 0;
    target.dishes = dishes;
    const dids: number[] = dishes.map((orderDish: OrderDish) => orderDish.did);
    const dishData = await Dish.findByIds(dids);
    dishes.forEach((od: OrderDish) => {
      const { did, option: options } = od;
      const dish = dishData.find((d) => d.did === did);
      if (!dish) return;
      price += dish.price;
      if (options.length) {
        const dbOptions = dish.options;
        options.forEach((option: DishOption, index) => {
          const key = Object.keys(option.content)[0];
          price += dbOptions[index].content[key];
        });
      }
    });
    target.user = user;
    target.price = price;
    const result = await target.save();
    if (!result) {
      ResponseWrap.fail(ctx, '提交订单失败');
      return;
    }
    target.format();
    broadcastOrder([result]);
    ResponseWrap.success(ctx, { order: result });
  } catch (error) {
    ResponseWrap.error(ctx);
  }
};

export const update = async (ctx: Ctx) => {
  try {
    const { oid, status } = ctx.request.body || {};
    const orders = await Order.findByIds([oid]);
    if (!orders.length) {
      ResponseWrap.fail(ctx, '无订单');
      return;
    }
    const order = orders[0];

    order.status = status;
    const result = await order.save();
    if (!result) {
      ResponseWrap.fail(ctx, '修改失败');
      return;
    }

    ResponseWrap.success(ctx, {});
  } catch (error) {
    ResponseWrap.error(ctx);
  }
};

export const cancel = async (ctx: Ctx) => {
  try {
    const { oid } = ctx.params;
    const { user: userInfo } = ctx.request.body || {};
    const user = await User.findOne(userInfo);
    if (!user) {
      ResponseWrap.fail(ctx, '无效用户');
    }

    const orders = await Order.findByIds([oid]);
    if (!orders.length) {
      ResponseWrap.fail(ctx, '无订单');
      return;
    }
    const order = orders[0];
    if (order.uid !== user.uid) {
      ResponseWrap.fail(ctx, '无权限');
      return;
    }

    if (order.status !== OrderStatus.ON_PROCESS) {
      ResponseWrap.fail(ctx, '无法更改');
      return;
    }

    order.status = OrderStatus.CANCELED;
    const result = await order.save();
    if (!result) {
      ResponseWrap.fail(ctx, '修改失败');
      return;
    }

    broadcastOrder([result], true);
    ResponseWrap.success(ctx, {});
  } catch (error) {
    ResponseWrap.error(ctx);
  }
};
