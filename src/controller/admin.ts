import { Ctx, Next } from '../constant';
import { Admin } from '../entity/admin';
import { logError } from '../utils/logger';
import { ResponseWrap } from '../utils/response';
import { sign, verify } from '../utils/jwt';

const KEY = 'controller.admin';

export const login = async (ctx: Ctx) => {
  try {
    const { aid, password } = ctx.request.body || {};
    if (!aid || !password) {
      ResponseWrap.fail(ctx);
      return;
    }

    const result = await Admin.insert({ aid, password });
    if (!result.identifiers.length) {
      ResponseWrap.fail(ctx);
      return;
    }

    const token = sign({ aid });
    ResponseWrap.success(ctx, token);
  } catch (error) {
    logError(`${KEY}.login`, error, ctx.request.body || {});
    ResponseWrap.error(ctx);
  }
};

export const sudo = async (ctx: Ctx, next: Next) => {
  try {
    const { header } = ctx.request;
    const { authorization = '' } = header;
    if (!authorization) {
      ResponseWrap.authFail(ctx);
      return;
    }

    const { aid } = verify(authorization);
    if (!aid) {
      ResponseWrap.authFail(ctx);
      return;
    }

    const admin = await Admin.findOne({ aid });
    if (!admin) {
      ResponseWrap.authFail(ctx);
      return;
    }

    if (ctx.request.body) {
      ctx.request.body = {
        ...ctx.request.body,
        admin,
      };
    } else {
      ctx.request.body = {
        admin,
      };
    }

    next();
  } catch (error) {
    logError(`${KEY}.admin`, error, ctx.request.header);
    ResponseWrap.error(ctx);
  }
};
