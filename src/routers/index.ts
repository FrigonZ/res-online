import Router = require('koa-router');
import { App } from '../constant';
import fs from './fs';
import hello from './hello';
import login from './login';
import dish from './dish';

const routers: Router[] = [fs, hello, login, dish];

const baseRouter = new Router({ prefix: '/api' });

export default (app: App) => {
  routers.forEach((router) => {
    baseRouter.use(router.routes()).use(router.allowedMethods());
  });
  app.use(baseRouter.routes()).use(baseRouter.allowedMethods());
};
