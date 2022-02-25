import Router = require('koa-router');
import { upload } from '../controller/cos';

const router = new Router({ prefix: '/file' });

router.post('/', upload);

export default router;
