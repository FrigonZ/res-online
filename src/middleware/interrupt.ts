import { Ctx, Next } from '../constant';
import { ResponseWrap } from '../utils/response';

export const removeIllegal = async (ctx: Ctx, next: Next) => {
  const { user, admin } = ctx.request.body || {};
  if (user || admin) {
    ResponseWrap.fail(ctx, '参数不合法');
    return;
  }
  await next();
};
