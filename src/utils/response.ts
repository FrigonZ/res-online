import { Ctx } from '../constant';

/** 返回错误码 */
export const enum ResCode {
  /** 失败 */
  FAIL = -1,
  /** 成功 */
  SUCCESS = 0,
  /** 鉴权错误 */
  AUTH_FAIL = 1,
  /** 错误 */
  EXCEPTION = 999,
}

interface Props {
  /** 错误码 */
  code: ResCode;
  /** 错误消息 */
  msg: string;
  /** 返回信息 */
  data: any;
}

/** 回复包装器 */
export class ResponseWrap {
  public code: ResCode;

  public msg: string;

  public data: any;

  public constructor(props: Props) {
    const { code, msg, data } = props;
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  /** 成功回复 */
  public static success = (ctx: Ctx, data: any) => {
    ctx.body = new ResponseWrap({
      code: ResCode.SUCCESS,
      msg: '',
      data,
    });
  };

  /** 失败回复 */
  public static fail = (ctx: Ctx, msg: string) => {
    ctx.body = new ResponseWrap({
      code: ResCode.FAIL,
      msg,
      data: '',
    });
  };

  /** 鉴权失败回复 */
  public static authFail = (ctx: Ctx) => {
    ctx.body = new ResponseWrap({
      code: ResCode.AUTH_FAIL,
      msg: '',
      data: '',
    });
  };

  public static error = (ctx: Ctx) => {
    ctx.body = new ResponseWrap({
      code: ResCode.EXCEPTION,
      msg: '',
      data: '',
    });
  };
}
