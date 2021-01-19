import Router from 'koa-router';
import * as authCtrl from '@api/auth/auth.ctrl';

const auth = new Router();

auth.get('/encproc', authCtrl.encproc);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);
auth.get('/store', authCtrl.store);

export default auth;
