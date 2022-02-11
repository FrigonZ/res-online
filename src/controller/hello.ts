import { Ctx, OrderAction } from '../constant';
import { Test } from '../entity/test';
import { doBroadcast, generateWebsocketUniq } from '../websocket';

export const hello = (ctx: Ctx) => {
  ctx.body = 'hello';
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
