import Router from 'koa-router';
import * as testCtrl from '@api/test/test.ctrl';
import checkLoggedIn from '@lib/checkLoggedIn';

const order = new Router();

order.get('/selectByMinorList', checkLoggedIn, testCtrl.selectByMinorList);
order.get('/selectByPrint', checkLoggedIn, testCtrl.selectByPrint);
order.get('/aaa',checkLoggedIn, testCtrl.aaaa)
order.post('/delete',checkLoggedIn, testCtrl.getRemove)
order.post('/register',checkLoggedIn, testCtrl.register)
order.post('/update',checkLoggedIn, testCtrl.getUpdate)
order.get('/select1',checkLoggedIn, testCtrl.select1)
order.get('/select1_1',checkLoggedIn, testCtrl.select1_1)
order.get('/select2',checkLoggedIn, testCtrl.select2)
order.get('/select2_1',checkLoggedIn, testCtrl.select2_1)
order.get('/select3',checkLoggedIn, testCtrl.select3)
order.get('/finalSelect',checkLoggedIn, testCtrl.finalSelect)



export default order;
