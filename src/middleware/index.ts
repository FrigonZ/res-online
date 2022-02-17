import bodyParser from 'koa-bodyparser';
import { App } from '../constant';
import { logMw } from './base';
import { removeIllegal } from './interrupt';

const middlewares = [logMw, removeIllegal];

export default (app: App) => {
  app.use(bodyParser());
  middlewares.forEach((mw) => {
    app.use(mw);
  });
};
