import Router = require('koa-router');
import { create, getAll, update } from '../controller/dish';

const router = new Router({ prefix: '/dish' });

router.get('/', getAll);

router.post('/', create);

router.put('/', update);

export default router;
