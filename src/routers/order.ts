import Router = require('koa-router');
import { sudo } from '../controller/admin';
import { auth } from '../controller/login';
import {
  cancel,
  create,
  getAll,
  getById,
  getByUser,
  update,
} from '../controller/order';

const router = new Router({ prefix: '/order' });

router.get('/', sudo, getAll);

router.get('/list', auth, getByUser);

router.get('/:oid', getById);

router.post('/', sudo, create);

router.put('/', sudo, update);

router.put('/:oid', auth, cancel);

export default router;
