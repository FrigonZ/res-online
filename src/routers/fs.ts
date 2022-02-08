import Router = require('koa-router');
import { fs } from '../controller/fs';

const router = new Router({ prefix: '/fs' });

router.get('/', fs);

export default router;
