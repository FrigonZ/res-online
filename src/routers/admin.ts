import Router = require('koa-router');
import { checkToken, getCode, login, sudo } from '../controller/admin';

const router = new Router({ prefix: '/nimda' });

router.post('/admin', login);

router.get('/admin', checkToken);

router.post('/wxacode', getCode);

export default router;
