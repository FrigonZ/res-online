import Router = require('koa-router');
import { sudo } from '../controller/admin';
import { create, getAll, update } from '../controller/dish';

const router = new Router({ prefix: '/dish' });

router.get('/', getAll);

router.post('/', sudo, create);

router.put('/', sudo, update);

export default router;
