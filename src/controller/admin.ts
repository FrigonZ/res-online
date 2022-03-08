import { Ctx, Next } from '../constant';
import { Admin } from '../entity/admin';
import { logError } from '../utils/logger';
import { ResponseWrap } from '../utils/response';
import { sign, verify } from '../utils/jwt';
import { getWxacode } from '../utils/wxacode';
import { doUpload, getObjectUrl } from '../utils/cos';

const KEY = 'controller.admin';

export const login = async (ctx: Ctx) => {
  try {
    const { aid, password } = ctx.request.body || {};
    if (!aid || !password) {
      ResponseWrap.fail(ctx);
      return;
    }

    const result = await Admin.find({ aid, password });
    if (!result.length) {
      ResponseWrap.fail(ctx);
      return;
    }

    const token = sign({ aid });
    ResponseWrap.success(ctx, { token });
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

    if (ctx.request.body) {
      ctx.request.body = {
        ...ctx.request.body,
        aid,
      };
    } else {
      ctx.request.body = {
        aid,
      };
    }

    await next();
  } catch (error) {
    logError(`${KEY}.sudo`, error, ctx.request.header);
    ResponseWrap.error(ctx);
  }
};

export const checkToken = (ctx: Ctx) => {
  try {
    const { header } = ctx.request;
    const { authorization = '' } = header;
    if (!authorization) {
      ResponseWrap.fail(ctx);
      return;
    }

    const { aid } = verify(authorization);
    if (!aid) {
      ResponseWrap.fail(ctx);
      return;
    }

    ResponseWrap.success(ctx, {});
  } catch (error) {
    logError(`${KEY}.checkToken`, error, ctx.request.header);
    ResponseWrap.error(ctx);
  }
};

export const getCode = async (ctx: Ctx) => {
  try {
    const { path, env } = ctx.query;
    if (!path || !env) {
      ResponseWrap.fail(ctx, '缺少参数');
      return;
    }
    const data = await getWxacode(path as string, env as string);
    if (!data) {
      ResponseWrap.fail(ctx, '获取失败');
      return;
    }
    const key = `code-${path}-${env}.jpg`;
    const resData = await doUpload(data, key);
    if (!resData) {
      ResponseWrap.fail(ctx, '二维码上传失败');
      return;
    }

    ResponseWrap.success(ctx, { url: getObjectUrl(key) });
  } catch (error) {
    logError(`${KEY}.getCode`, error, ctx.params);
  }
};
