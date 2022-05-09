import Router = require('koa-router');
import { sudo } from '../controller/admin';
import { add, get, remove } from '../controller/discount';

const router = new Router({ prefix: '/discount' });

router.get('/', get);

router.post('/', sudo, add);

router.put('/', sudo, remove);

export default router;
