import { OrderAction, OrderOption, WebSocketUniq } from '../constant';

/** 构造websocket协议结构体 */
export const generateWebsocketUniq = (
  action: OrderAction,
  options: OrderOption,
  data = {}
): WebSocketUniq => {
  return {
    action,
    options,
    id: '',
    data,
  };
};
