import Koa = require('koa');
import Router = require('koa-router');
import { doLog } from './utils/logger';
import { getWsServer } from './websocket';

const PORT = 8081;

const app = new Koa();
const router = new Router();
const ws = getWsServer();

app.use((ctx, next) => {
  doLog(`receive koa connection ctx=${JSON.stringify(ctx)}`);
  ws.emit('hello');
  return next();
});

router.get('/hello', async (ctx) => {
  ctx.body = 'hello world';
});

app.use(router.routes());

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
