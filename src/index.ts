import Koa = require('koa');

const app = new Koa();

app.use(async (ctx: any) => {
  ctx.body = 'hello world';
});

app.listen(8080);
console.log('app is listening at 8080');
