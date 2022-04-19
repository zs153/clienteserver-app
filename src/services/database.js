import oracledb from "oracledb";
import { dbPool } from "../config/settings";

const initialize = async () => {
  const pool = await oracledb.createPool(dbPool);
};
module.exports.initialize = initialize;

const close = async () => {
  await oracledb.getPool().close(0);
};
module.exports.close = close;

const simpleExecute = async (sql, binds = [], opts = {}) => {
  let conn;

  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(sql, binds, opts);

    return result;
  } catch (err) {
    console.error(err);
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
module.exports.simpleExecute = simpleExecute;
