import dbPool from '@lib/db';
import winston from '@root/winston';

export const selectByMinorList = async ctx => {
  const { Minor } = ctx.request.query;  

  if (!Minor) {
    ctx.status = 500;
    return;
  }  

  try {
    const query = `
      SELECT *
        FROM TMinor
       WHERE Minor  = '${Minor}'
       ORDER BY MinorCd
    `;
    const pool = await dbPool();
    const result = await pool.request().query(query);    
    const rtn = result.recordset;
    if(!rtn || rtn.length < 1){
      ctx.throw(404);
    }else{
      ctx.body = rtn;
    }
  } catch (e) {
    winston.error(e.message);
    ctx.throw(500, e);
  }   
};

export const selectByPrint = async ctx => {
  const { invoiceno, Custcd } = ctx.request.query;  

  if (!invoiceno || !Custcd ) {
    ctx.status = 500;
    return;
  }  

  try {
    const pool = await dbPool();
    let result = await pool.request()        
      .input('iTag', 'Q1')
      .input('iStDate', '')
      .input('iEdDate', '')      
      .input('iAccunit', '001')
      .input('iFactory', '00A')
      .input('iInvoiceno', invoiceno)               
      .input('iCustcd', Custcd)               
      .execute('Sc_PMSOrderDelvSch_Prt');
    const rtn = result.recordset;
    if(!rtn || rtn.length < 1){
      ctx.throw(404);
    }else{
      ctx.body = rtn;
    }
  } catch (e) {
    winston.error(e.message);
    ctx.throw(500, e);
  }   
};