import axios from 'axios';
import { Ctx, LogType, Next } from '../constant';
import { User } from '../entity/user';
import { sign, verify } from '../utils/jwt';
import { joinParams } from '../utils/request';
import { URI } from '../constant/uri';
import { appid, secret } from '../constant/config';
import { ResponseWrap } from '../utils/response';
import { doLog } from '../utils/logger';

/** 用户登录 */
export const login = async (ctx: Ctx) => {
  try {
    const { code } = ctx.request.body || {};
    if (!code) {
      ResponseWrap.fail(ctx, '缺少code参数');
      return;
    }

    /** 去微信后台请求openid与session_key */
    const res = await axios.get(
      joinParams(URI.WX_SESSION_KEY, {
        appid,
        secret,
        js_code: code,
        grant_type: 'authorization_code',
      })
    );
    const { openid = '' } = res.data || {};
    if (!openid) {
      ResponseWrap.fail(ctx, '用户不存在');
      return;
    }

    /** 新老用户判断 */
    let user = await User.findOne({ openid });
    if (!user) {
      user = new User();
      user.openid = openid;
      user = await user.save();
    }

    /** 加密返回jwt */
    const rawToken = {
      user,
    };
    const token = sign(rawToken);
    ResponseWrap.success(ctx, {
      token,
    });
  } catch (error) {
    doLog(JSON.stringify(error), LogType.ERROR);
    ResponseWrap.error(ctx);
  }
};

/** 用户访问鉴权，更像是一个中间件 */
export const auth = async (ctx: Ctx, next: Next) => {
  try {
    const { header } = ctx.request;
    const { authorization = '' } = header;
    if (!authorization) {
      ResponseWrap.authFail(ctx);
      return;
    }

    const { user } = verify(authorization);
    if (!user) {
      ResponseWrap.authFail(ctx);
      return;
    }

    const hasUser = await User.find(user);
    if (!hasUser) {
      ResponseWrap.authFail(ctx);
      return;
    }

    ctx.params.user = user;
    next();
  } catch (error) {
    doLog(JSON.stringify(error), LogType.ERROR);
    ResponseWrap.error(ctx);
  }
};
