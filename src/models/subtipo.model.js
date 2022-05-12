import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  ss.idsubt,
  ss.dessub,
  tt.destip
FROM subtipos ss
INNER JOIN subtipostipo st ON st.idsubt = ss.idsubt
INNER JOIN tipos tt ON tt.idtipo = st.idtipo
`;
const largeQuery = `SELECT 
  ss.idsubt,
  ss.dessub
FROM subtipos ss
INNER JOIN subtipostipo st ON st.idsubt = ss.idsubt
WHERE st.idtipo = :idtipo
`;
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTSUBTIPO(
  :idtipo, 
  :dessub,
  :usumov,
  :tipmov,
  :idsubt
); END;
`;
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATESUBTIPO(
  :idsubt,
  :dessub,
  :usumov,
  :tipmov
); END;
`;
const removeSql = `BEGIN FORMULARIOS_PKG.DELETESUBTIPO(
    :idsubt,
    :usumov,
    :tipmov 
  ); END;
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.idsubt) {
    binds.idsubt = context.idsubt;
    query += `WHERE ss.idsubt = :idsubt`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findAll = async (context) => {
  let query = baseQuery;

  const result = await simpleExecute(query);

  return result.rows;
};
export const findSubtiposTipo = async (context) => {
  let query = largeQuery;
  let binds = {};

  binds.idtipo = context.idtipo;

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findTiposSubtipos = async () => {
  let query = tiposSubtipos;

  const result = await simpleExecute(query);
  return result.rows;
};

export const insert = async (bind) => {
  bind.idsubt = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    const result = await simpleExecute(insertSql, bind);

    bind.idsubt = await result.outBinds.idsubt;
  } catch (error) {
    bind = null;
  }

  return bind;
};
export const update = async (bind) => {
  let result;

  try {
    await simpleExecute(updateSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const remove = async (bind) => {
  let result;

  try {
    await simpleExecute(removeSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
