import { Ctx } from '../constant';
import { Order } from '../entity/order';
import { ResponseWrap } from '../utils/response';

export const getAll = async (ctx: Ctx) => {
  try {
    const orders = await Order.find();
    ResponseWrap.success(ctx, { orders });
  } catch (error) {
    ResponseWrap.error(ctx);
  }
};
