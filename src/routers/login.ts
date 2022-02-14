import Router = require('koa-router');
import { login } from '../controller/login';

const router = new Router({ prefix: '/login' });

router.post('/', login);

// router.get('/auth', auth);

export default router;
