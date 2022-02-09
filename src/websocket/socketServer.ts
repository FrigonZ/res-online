import Websocket = require('ws');
import { doLog } from '../utils/logger';
import { SocketItem } from './socket';

/** 单例socket server */
let wss: Websocket.Server;

/** 建立连接处理 */
const handleConnect = (socket: Websocket) => {
  const socketItem = new SocketItem({
    socket,
  });

  doLog(`receive socket key=${socketItem.key}`);
};

/** 初始化websocket server */
export const initWsServer = (server: any) => {
  wss = new Websocket.Server({ server });
  wss.on('connection', handleConnect);
};
