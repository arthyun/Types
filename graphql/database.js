const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.NEXT_PUBLIC_DB_PASS,
  database: 'test',
  port: 3306,
  connectionLimit: 5
});

export const executePool = async (sql, value) => {
  let conn;
  conn = await pool.getConnection();
  const result = await conn.query(sql, value);
  await conn.release();
  return result;
};
