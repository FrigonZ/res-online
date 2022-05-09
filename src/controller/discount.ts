import { Ctx } from '../constant';
import { Discount } from '../entity/discount';
import { getDiscounts, initDiscounts } from '../utils/discount';
import { logError } from '../utils/logger';
import { ResponseWrap } from '../utils/response';

const KEY = 'controller.discount';

export const add = async (ctx: Ctx) => {
  try {
    const { discount } = ctx.request.body;
    if (!discount) {
      ResponseWrap.fail(ctx, '缺少discount');
      return;
    }

    const result = await Discount.insert(discount);
    if (result.identifiers.length === 0) {
      ResponseWrap.fail(ctx, '添加失败');
      return;
    }
    initDiscounts();

    ResponseWrap.success(ctx, {});
  } catch (error) {
    logError(`${KEY}.add`, error);
    ResponseWrap.error(ctx);
  }
};

export const get = async (ctx: Ctx) => {
  try {
    if (getDiscounts().length) {
      ResponseWrap.success(ctx, {
        discounts: getDiscounts(),
      });
      return;
    }
    const discounts = await Discount.find();
    ResponseWrap.success(ctx, {
      discounts,
    });
  } catch (error) {
    logError(`${KEY}.get`, error);
    ResponseWrap.error(ctx);
  }
};

export const remove = async (ctx: Ctx) => {
  try {
    const { did } = ctx.request.body;
    const result = await Discount.delete(did);
    if (result.affected !== 1) {
      ResponseWrap.fail(ctx, '无效的id');
      return;
    }

    initDiscounts();
    ResponseWrap.success(ctx, {
      did,
    });
  } catch (error) {
    logError(`${KEY}.delete`, error);
    ResponseWrap.error(ctx);
  }
};
