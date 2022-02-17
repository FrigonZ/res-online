import Router = require('koa-router');
import { login } from '../controller/admin';

const router = new Router({ prefix: '/nimda' });

router.get('/admin', login);

export default router;
