import Router = require('koa-router');
import { login, sudo } from '../controller/admin';

const router = new Router({ prefix: '/nimda' });

router.post('/admin', login);

router.get('/auth', sudo);

export default router;
