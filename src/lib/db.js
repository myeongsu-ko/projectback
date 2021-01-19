import sql from 'mssql';
import env from '@root/config.json';

const pools = {}
const config = {
  user: env.MSSQL_USER,
  password: env.MSSQL_PASS,  
  server: env.MSSQL_URL,
  database: env.MSSQL_DB,
  port: parseInt(env.MSSQL_PORT),
  pool: {
    max: 100,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    enableArithAbort: true
  },
};

const getPool = async () => {
  const name = 'default';
  if (!Object.prototype.hasOwnProperty.call(pools, name)) {
    const pool = new sql.ConnectionPool(config);
    const close = pool.close.bind(pool);
    pool.close = (...args) => {
      delete pools[name];
      return close(...args)
    }
    await pool.connect();
    pools[name] = pool;
  }
  return pools[name];
}

export default getPool