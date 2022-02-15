import Router = require('koa-router');
import { read } from '../controller/log';

const router = new Router({ prefix: '/log' });

router.get('/', read);

export default router;
