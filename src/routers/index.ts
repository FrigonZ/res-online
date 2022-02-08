import Router = require('koa-router');
import { App } from '../constant';
import fs from './fs';
import hello from './hello';

const routers: Router[] = [fs, hello];

const baseRouter = new Router({ prefix: '/api' });

export default (app: App) => {
  routers.forEach((router) => {
    baseRouter.use(router.routes()).use(router.allowedMethods());
  });
  app.use(baseRouter.routes()).use(baseRouter.allowedMethods());
};
