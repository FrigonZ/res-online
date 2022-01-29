import Websocket = require('ws');
import { doLog } from '../utils/logger';
import { SocketItem } from './socket';

/** websocket服务监听端口 */
const PORT = 443;

/** 单例socket server */
let wss: Websocket.Server;

/** 建立连接处理 */
const handleConnect = (socket: Websocket) => {
  const socketItem = new SocketItem({
    socket,
  });

  doLog(`receive socket key=${socketItem.key}`);
};

/** 获取socket server单例 */
export const getWsServer = () => {
  if (wss) return wss;
  wss = new Websocket.Server({ port: PORT });
  wss.on('connection', handleConnect);
  return wss;
};
