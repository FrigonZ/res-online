import Koa = require('koa');
import Router = require('koa-router');
import { doLog } from './utils/logger';
import { getWsServer } from './websocket';

// http服务监听端口
const PORT = 8080;

const app = new Koa();
const router = new Router();
getWsServer();

app.use((ctx, next) => {
  doLog(`receive koa connection ctx=${JSON.stringify(ctx)}`);
  return next();
});

router.get('/hello', async (ctx) => {
  ctx.body = 'hello world';
});

app.use(router.routes());

app.listen(PORT, () => {
  doLog(`app is running on ${PORT}`);
});
