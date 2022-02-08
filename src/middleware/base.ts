import { Ctx, Next } from '../constant';
import { doLog } from '../utils/logger';

export const logMw = (ctx: Ctx, next: Next) => {
  doLog(`receive koa connection ctx=${JSON.stringify(ctx)}`);
  return next();
};
