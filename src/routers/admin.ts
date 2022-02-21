import Router = require('koa-router');
import { login } from '../controller/admin';

const router = new Router({ prefix: '/nimda' });

router.post('/admin', login);

export default router;
