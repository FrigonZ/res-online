import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import koaBody from 'koa-body';
import { App } from '../constant';
import { logMw } from './base';
import { removeIllegal } from './interrupt';

const middlewares = [logMw, removeIllegal];

export default (app: App) => {
  app.use(
    cors({
      origin: '*',
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Token'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
  );
  app.use(
    koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 100 * 1024 * 1024,
      },
    })
  );
  app.use(bodyParser());
  middlewares.forEach((mw) => {
    app.use(mw);
  });
};
