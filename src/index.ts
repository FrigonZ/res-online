// app入口文件
import Koa = require('koa');
import initialRoute from './routers';
import initialMiddleware from './middleware';
import { doLog } from './utils/logger';
import { getWsServer } from './websocket';

// http服务监听端口
const PORT = 8080;

const app = new Koa();
getWsServer();

initialMiddleware(app);
initialRoute(app);

app.listen(PORT, () => {
  doLog(`app is running on ${PORT}`);
});
