// app入口文件
import Koa = require('koa');
import http = require('http');
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import initialRoute from './routers';
import initialMiddleware from './middleware';
import { doLog, removeLogTimer, setLogTimer } from './utils/logger';
import { initWsServer } from './websocket';
import { initDiscounts } from './utils/discount';

// 服务监听端口
const PORT = 8080;

const app = new Koa();
const server = http.createServer(app.callback());

createConnection().then(initDiscounts);
initWsServer(server);

initialMiddleware(app);
initialRoute(app);
setLogTimer();

server.listen(PORT, () => {
  doLog(`app is running on ${PORT}`);
});

process.on('exit', removeLogTimer);
