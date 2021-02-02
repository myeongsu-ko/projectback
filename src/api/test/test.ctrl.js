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
/////////////////////////////////// 1/26////////////////////////

//작성
export const register =async ctx=> { //request 나 response의 정보를 담고있음
  console.log('Write 시작')
  
  try{
    const query = `
    insert into Tminor(Minorcd, Minornm,Minor, Remark, Item1, Item2, Item3, Item4, UseYn) values (@Minorcd, @Minornm,@Minor,@Remark, @Item1, @Item2, @Item3,@Item4,@UseYn)
    `
    const pool = await dbPool();
       console.log('디비연결 성공')
       console.log('params')
       console.log('바디정보',ctx.request.body.data)
       const result = await pool.request()
      .input('Minorcd', ctx.request.body.data.Minorcd)
      .input('Minor',ctx.request.body.data.Minor)
      .input('Minornm', ctx.request.body.data.Minornm)
      .input('Remark',ctx.request.body.data.Remark)
      .input('Item1',ctx.request.body.data.Item1)
      .input('Item2',ctx.request.body.data.Item2)
      .input('Item3',ctx.request.body.data.Item3)
      .input('Item4',ctx.request.body.data.Item4)
      .input('UseYn',ctx.request.body.data.UseYn)
      .query(query)
      ctx.body = {"errmess": ''};
    } catch (e) {
      winston.error(e.message);
      ctx.throw(500, e);
    } 
}

//삭제
export const getRemove = async ctx => {
  console.log("Delete 시작")
  try{
    const query =`
    delete from Tminor where Minorcd = @Minorcd
    `
      console.log('넘어온 값',ctx.request.body);
      const pool = await dbPool();
      await pool.request().input('Minorcd',ctx.request.body.data.Minorcd).query(query);
      ctx.body = {"errmess": ''};
  } catch(e){
      winston.error(e.message);
      ctx.throw(500,e);
  }
}

/* 특정 데이터 수정 */
export const getUpdate = async  ctx => {
  console.log("Update 시작")

  try{
    const query = `
    update Tminor set Minor=@Minor ,Minorcd=@Minorcd ,Minornm=@Minornm ,Remark=@Remark,Item1=@Item1 ,Item2=@Item2 ,Item3=@Item3 ,Item4=@Item4 ,UseYn=@UseYn  where Minorcd = @Minorcd1
    `
      console.log("넘어온 값",ctx.request.body.data.write1);
      const pool = await dbPool();
      console.log("디비연결성공")
      const result = await pool.request().input('Minorcd1',ctx.request.body.data.write1.Minorcd)
      .input('Minornm',ctx.request.body.data.write1.Minornm)
      .input('Minorcd',ctx.request.body.data.write1.Minorcd)
      .input('Minor', ctx.request.body.data.write1.Minor)
      .input('Remark',ctx.request.body.data.write1.Remark)
      .input('Item1',ctx.request.body.data.write1.Item1)
      .input('Item2',ctx.request.body.data.write1.Item2)
      .input('Item3',ctx.request.body.data.write1.Item3)
      .input('Item4',ctx.request.body.data.write1.Item4)
      .input('UseYn',ctx.request.body.data.write1.UseYn)
      .query(query)
      ctx.body = {"errmess": ''};
  } catch(e){
    winston.error(e.message);
    ctx.throw(500,e);
  }
}
///////////////////////////////////////////////////////////
export const aaaa = async ctx => {

  try {
    const query = `
    select * from (

      select SUBSTRING(Minor,0,4) As Minorcd
        , Minor
        , '' as Minornm
        , COUNT(*) AS CNT
        , 0 as sort
		,'' as Remark
		,'' as Item1
		,'' as Item2
		,'' as Item3
		,'' as Item4
		,'' as UseYn
         FROM TMinor
         GROUP BY Minor
      
      union all
      
      SELECT Minorcd
        , Minor
        , Minornm
        , '' as CNT
        , 1 as sort
		,Remark
		,Item1
		,Item2
		,Item3
		,Item4
		,UseYn
        From Tminor
        ) a order by a.minor, a.sort
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
//////////////////////////////////////////////////////////1/27///////////////////////
export const select1 =async ctx=> { //request 나 response의 정보를 담고있음
  console.log('2번째 시작')
  const data  = ctx.request.query;
  console.log(data)

  if (!data || !data.Minor || !data.Item1 || !data.Minornm) {
    ctx.status = 500;
    return;
  }  
  try{
    const query = `
    SELECT Minorcd 
    , Minornm 
    , Remark 
    , Item1 
    , Item2 
        FROM TMinor WHERE Minor = '${data.Minor}' AND isnull(UseYn, 'Y') != 'N' AND Item1 = '${data.Item1}'  AND (Minornm like '${data.Minornm}'+'%') ORDER BY SortSeq, Minorcd
    `
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
}
export const select1_1 =async ctx=> { //request 나 response의 정보를 담고있음
  console.log('2번째 시작')
  const data  = ctx.request.query;
  console.log(data)

  if (!data || !data.Minor || !data.Item1 || !data.Minornm || !data.Item2) {
    ctx.status = 500;
    return;
  }  
  try{
    const query = `
    SELECT Minorcd 
    , Minornm 
    , Remark 
    , Item1 
    , Item2 
        FROM TMinor WHERE Minor = '${data.Minor}' AND isnull(UseYn, 'Y') != 'N'AND Item2 = '${data.Item2}' AND Item1 = '${data.Item1}'  AND (Minornm like '${data.Minornm}'+'%') ORDER BY SortSeq, Minorcd
    `
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
}

export const select2 =async ctx=> { //request 나 response의 정보를 담고있음
  console.log('3번째 시작')
  const data  = ctx.request.query;
  console.log(data)

  if (!data || !data.Minor || !data.likes) {
    ctx.status = 500;
    return;
  }  
  try{
    const query = `
    SELECT Minorcd 
    , Minornm 
    , Remark 
    , Item2 
    , Item3 
        FROM TMinor 
        WHERE Minor = '${data.Minor}' 
        AND isnull(UseYn, 'Y') != 'N' 
        AND (Minornm like '${data.likes}' OR Remark like '${data.likes}' OR Item2 like '${data.likes}' OR Item3 like '${data.likes}') 
        ORDER BY Item3, Item2, Remark
    `
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
}

export const select3 =async ctx=> { //request 나 response의 정보를 담고있음
  console.log('3번째 시작')
  const data  = ctx.request.query;
  console.log(data)

  if (!data || !data.likes) {
    ctx.status = 500;
    return;
  }  
  try{
    const query = `
    SELECT Minorcd
    , Minornm
    , Remark
    , Item1
    , Item2
    FROM TMinor
    WHERE Minor = '063'
    AND isnull(UseYn, 'Y') != 'N'
    AND (Minornm like '${data.likes}%' OR Remark like '${data.likes}%' OR
    Item2 like '${data.likes}%')
    ORDER BY SortSeq, Minorcd
    `
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
}

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