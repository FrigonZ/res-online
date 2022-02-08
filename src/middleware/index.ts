import { App } from '../constant';
import { logMw } from './base';

const middlewares = [logMw];

export default (app: App) => {
  middlewares.forEach((mw) => {
    app.use(mw);
  });
};
