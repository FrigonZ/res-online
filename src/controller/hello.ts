import { Ctx } from '../constant';

export const hello = (ctx: Ctx) => {
  ctx.body = 'hello';
};
