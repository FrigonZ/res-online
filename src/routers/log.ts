import Router = require('koa-router');
import { sudo } from '../controller/admin';
import { read } from '../controller/log';

const router = new Router({ prefix: '/log' });

router.get('/', sudo, read);

export default router;
