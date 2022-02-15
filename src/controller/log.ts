import { Ctx } from '../constant';
import { Logs } from '../entity/log';
import { logError } from '../utils/logger';
import { ResponseWrap } from '../utils/response';

const KEY = 'controller.log';

export const read = async (ctx: Ctx) => {
  try {
    const logs = await Logs.find();
    ResponseWrap.success(ctx, { logs });
  } catch (error) {
    logError(`${KEY}.read`, error);
    ResponseWrap.error(ctx);
  }
};
