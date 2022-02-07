// app入口文件
import Koa = require('koa');
import Router = require('koa-router');
import { OrderAction } from './constant';
import { doLog } from './utils/logger';
import { doBroadcast, getWsServer } from './websocket';
import { generateWebsocketUniq } from './websocket/helper';

// http服务监听端口
const PORT = 8080;

const app = new Koa();
const router = new Router();
getWsServer();

// TODO: 中间件部分单独封装到./middleware
app.use((ctx, next) => {
  doLog(`receive koa connection ctx=${JSON.stringify(ctx)}`);
  return next();
});

// TODO: 路由部分单独封装到./router
router.get('/hello', async (ctx) => {
  ctx.body = 'hello world';
});

router.get('/set', async (ctx) => {
  const castData = generateWebsocketUniq(OrderAction.SET, {});
  doBroadcast(castData);
  ctx.body = 'set successed';
});

app.use(router.routes());

app.listen(PORT, () => {
  doLog(`app is running on ${PORT}`);
});
