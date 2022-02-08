import Router = require('koa-router');
import { OrderAction } from '../constant';
import { hello } from '../controller/hello';
import { doBroadcast, generateWebsocketUniq } from '../websocket';

const router = new Router({ prefix: '/hello' });

router.get('/', hello);

router.get('/set', async (ctx) => {
  const castData = generateWebsocketUniq(OrderAction.SET, {});
  doBroadcast(castData);
  ctx.body = 'set successed';
});

export default router;
