import Router from 'koa-router';
import auth from '@api/auth';
import test from '@api/test';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/test', test.routes());

// 라우터를 내보냅니다.
export default api;
