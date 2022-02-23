import Router = require('koa-router');
import { checkToken, login } from '../controller/admin';

const router = new Router({ prefix: '/nimda' });

router.post('/admin', login);

router.get('/admin', checkToken);

export default router;
