import { Ctx, OrderAction } from '../constant';
import { Test } from '../entity/test';
import { ResponseWrap } from '../utils/response';
import { doBroadcast, generateWebsocketUniq } from '../websocket';

/** 用来调试服务联通情况 */
export const hello = (ctx: Ctx) => {
  const { user } = ctx.params;
  ResponseWrap.success(ctx, {
    hello: 'hello',
    user,
  });
};

export const test = async (ctx: Ctx) => {
  const { tid } = ctx.params;
  let result;
  if (tid) {
    result = await Test.findOne(tid);
  } else {
    result = await Test.find();
  }
  ctx.body = result;
};

export const set = (ctx: Ctx) => {
  const castData = generateWebsocketUniq(OrderAction.SET, {});
  doBroadcast(castData);
  ctx.body = 'set successed';
};
