import { OrderAction, OrderStatus } from './types';

/** 订单数据交互参数 */
export interface OrderOption {
  time?: number;
  oid?: string;
  status?: OrderStatus;
  wsid?: string;
}

/** socket接口统一协议 */
export interface WebSocketUniq {
  action: OrderAction;
  options: OrderOption;
  id: string;
  data?: any;
}

export interface WebSocketResponse {
  data: WebSocketUniq[];
}

export interface WebSocketRequest {
  authorization: string;
  data: WebSocketUniq[];
}
