import { Ctx, Next } from '../constant';
import { doLog } from '../utils/logger';

export const logMw = async (ctx: Ctx, next: Next) => {
  doLog(`receive koa connection ctx=${JSON.stringify(ctx)}`);
  await next();
};
