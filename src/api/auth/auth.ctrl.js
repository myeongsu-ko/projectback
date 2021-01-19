import axios from 'axios';
import Token from '@lib/token';
import dbPool from '@lib/db';
import winston from '@root/winston';
import env from '@root/config.json';

const sleep = (ms) => {
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

export const encproc = async ctx => {
  const { userid, password } = ctx.request.query;
  if (!userid || !password) {
    ctx.status = 401;
    return;
  }

  try {
    let result = await axios.get(env.PWENC_URL, {
      params: {id: userid, password: password}
    });  
    ctx.body = result.data.result;
  } catch (e) {
    winston.error(e.message);
    ctx.throw(500, e);
  }   
};

export const login = async ctx => {
  const { userid, password } = ctx.request.body;
  
  if (!userid || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const pool = await dbPool();
    // await sleep(1500);

    let result = await pool.request()        
      .input('iTag', 'L')
      .input('iUserId', userid)
      .input('iPassWord', password)      
      .output('iUserNm')
      .output('ErrMess')            
      .execute('Sc_WebLogin_Chk2');
    const output = result.output;
    if(output){
      if(output.ErrMess === ''){
        ctx.body = {
          "userid": userid,
          "username": output.iUserNm.trim(),
          "errmess": ''
        };
        winston.info(`Login : ${userid}`);
        const token = Token(userid);
        ctx.cookies.set('access_token', token, {
          maxAge: 1000 * 60 * 60 * 8760,
          httpOnly: true,
        });        
      }else{
        ctx.body = {"errmess": output.ErrMess};
      }
    }else{
      ctx.throw(500);
    }
  } catch (e) {
    winston.error(e.message);
    ctx.throw(500, e);
  }   
};

export const check = async ctx => {
  const { user } = ctx.state;
  if (!user) {
    // 로그인중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

export const logout = async ctx => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};

export const store = async ctx => {
  ctx.body = env.STORE_SECRET;
};

