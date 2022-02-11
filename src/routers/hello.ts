import Router = require('koa-router');
import { hello, set, test } from '../controller/hello';

const router = new Router({ prefix: '/hello' });

router.get('/', hello);

router.get('/test', test);

router.get('/test/:tid', test);

router.get('/broadcast', set);

export default router;
