import bodyParser from 'koa-bodyparser';
import { App } from '../constant';
import { logMw } from './base';

const middlewares = [logMw];

export default (app: App) => {
  app.use(bodyParser());
  middlewares.forEach((mw) => {
    app.use(mw);
  });
};
