import Router = require('koa-router');
import { sudo } from '../controller/admin';
import { add, get } from '../controller/group';

const router = new Router({ prefix: '/group' });

router.get('/', get);

router.post('/', sudo, add);

export default router;
