import Router from 'koa-router';
import * as testCtrl from '@api/test/test.ctrl';
import checkLoggedIn from '@lib/checkLoggedIn';

const order = new Router();

order.get('/selectByMinorList', checkLoggedIn, testCtrl.selectByMinorList);
order.get('/selectByPrint', checkLoggedIn, testCtrl.selectByPrint);

export default order;
