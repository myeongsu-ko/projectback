import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import api from './api';
import jwtMiddleware from '@lib/jwtMiddleware';
import env from '@root/config.json';
import winston from '@root/winston';

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/@', api.routes());

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// PORT 가 지정되어있지 않다면 4000 을 사용
const port = env.PORT || 4000;
app.listen(port, () => {
  winston.info(`Server Starting...  Listening to port ${port}`);
});
