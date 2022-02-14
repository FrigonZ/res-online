import Koa = require('koa');
import Router = require('koa-router');

export type App = Koa<Koa.DefaultState, Koa.DefaultContext>;

export type Ctx = Koa.ParameterizedContext<
  any,
  Router.IRouterParamContext<any, {}>,
  any
>;

export type Next = Koa.Next;

/** 日志类型 */
export const enum LogType {
  LOG = 'LOG',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/** 日志结构 */
export interface LogInfo {
  type: LogType;
  time: string;
  msg: string;
}

/** 订单状态 */
export const enum OrderStatus {
  /** 制作中 */
  ON_PROCESS,
  /** 制作完成 */
  FINISHED,
  /** 取消 */
  CANCELED,
}
