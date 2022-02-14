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
  INFO = 'INFO',
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

/** 餐品状态 */
export const enum DishStatus {
  /** 正常 */
  NORMAL,
  /** 售罄 */
  SOLD_OUT,
  /** 下架 */
  CLOSED,
}

/** 餐品自定义 */
export interface DishOption {
  /** 分组名 */
  group?: string;
  /** 选项名 */
  names: string[];
  /** 选项价格 */
  prices: number[];
  /** 是否多选 */
  isMulti: boolean;
}
