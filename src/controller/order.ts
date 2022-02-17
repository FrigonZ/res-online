import { Ctx, OrderStatus } from '../constant';
import { Order } from '../entity/order';
import { User } from '../entity/user';
import { ODProps, OrderDish } from '../relation/order-dish';
import { ResponseWrap } from '../utils/response';

const PAGE = 10;

export const getAll = async (ctx: Ctx) => {
  try {
    const { page = 1 } = ctx.params;
    const orders = await Order.find({
      skip: (Number(page) - 1) * PAGE,
      take: PAGE,
    });
    ResponseWrap.success(ctx, { orders });
  } catch (error) {
    ResponseWrap.error(ctx);
  }
};

export const getByUser = async (ctx: Ctx) => {
  try {
    const { user } = ctx.request.body;
    const { orders } = user as any as User;
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
    const { order, dishes, user } = ctx.request.body || {};
    if (!order) {
      ResponseWrap.fail(ctx, '缺少order');
      return;
    }
    const target = Order.generateOrder(order);
    target.dishes = (dishes as ODProps[]).map((dish) =>
      OrderDish.generateOrderDish(dish)
    );
    target.user = user;
    const result = await target.save();
    if (!result) {
      ResponseWrap.fail(ctx, '提交订单失败');
      return;
    }
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
    const { user } = ctx.request.body || {};
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

    ResponseWrap.success(ctx, {});
  } catch (error) {
    ResponseWrap.error(ctx);
  }
};
