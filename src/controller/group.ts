import { Ctx } from '../constant';
import { Group } from '../entity/group';
import { logError } from '../utils/logger';
import { ResponseWrap } from '../utils/response';

const KEY = 'controller.group';

export const add = async (ctx: Ctx) => {
  try {
    const { group } = ctx.request.body;
    if (!group) {
      ResponseWrap.fail(ctx, '缺少group');
      return;
    }

    const result = await Group.insert({
      name: group,
    });
    if (result.identifiers.length === 0) {
      ResponseWrap.fail(ctx, '添加失败');
      return;
    }

    ResponseWrap.success(ctx, {});
  } catch (error) {
    logError(`${KEY}.add`, error);
    ResponseWrap.error(ctx);
  }
};

export const get = async (ctx: Ctx) => {
  try {
    const groups = await Group.find();
    ResponseWrap.success(ctx, {
      groups,
    });
  } catch (error) {
    logError(`${KEY}.get`, error);
    ResponseWrap.error(ctx);
  }
};
