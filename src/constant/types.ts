import Koa = require('koa');
import Router = require('koa-router');

export type App = Koa<Koa.DefaultState, Koa.DefaultContext>;

export type Ctx = Koa.ParameterizedContext<
  any,
  Router.IRouterParamContext<any, {}>,
  any
>;

export type Next = Koa.Next;

/** 日志类型, INFO/ERROR会写入数据库 */
export const enum LogType {
  /** 普通类型 */
  LOG = 'LOG',
  /** 信息类型 */
  INFO = 'INFO',
  /** 错误类型 */
  ERROR = 'ERROR',
}

/** 日志结构 */
export interface LogInfo {
  /** 日志类型 */
  type: LogType;
  /** 日志时间 */
  time: Date;
  /** 日志信息 */
  msg: string;
  /** 日志key */
  key?: string;
}

/** 订单接口行为 */
export const enum OrderAction {
  /** 获取订单列表 */
  GET,
  /** 调整订单状态 */
  SET,
  /** 确认消息 */
  CONFIRM,
  /** 心跳消息 */
  HEART_BEAT,
  /** 终止连接 */
  FINISH,
  /** 鉴权失败 */
  AUTH_FAIL,
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
  content: Record<string, number>;
  /** 是否多选 */
  isMulti: boolean;
}

/** 订单内容 */
export interface OrderDish {
  /** 餐品id */
  did: number;
  /** 餐品自定义 */
  option: DishOption[];
}
