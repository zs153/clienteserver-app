import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const outFormat = oracledb.OUT_FORMAT_OBJECT;
const baseQuery = `
  SELECT 
    idofic,
    desofi,
    codofi
  FROM oficinas
`;
export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.id) {
    binds.idofic = context.id;

    query += `\nWHERE idofic = :idofic`;
  }

  const result = await simpleExecute(query, binds, { outFormat });
  return result.rows;
};

const insertSql = `
  BEGIN FORMULARIOS_PKG.INSERTOFICINA(
    :desofi, 
    :codofi,
    :usumov,
    :tipmov
  ); END;
`;
export const insert = async (ofi) => {
  const bind = Object.assign({}, ofi);

  bind.idofic = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  const result = await database.simpleExecute(insertSql, bind, {
    autoCommit: true,
  });

  bind.idofic = result.outBinds.idofic[0];

  return bind;
};

const updateSql = `BEGIN FORMULARIOS_PKG.UPDATEOFICINA(
  :idusua,
  :desofi, 
  :codofi,
  :usumov,
  :tipmov
); END;`;

export const update = async (ofi) => {
  const bind = Object.assign({}, ofi);
  const result = await database.simpleExecute(updateSql, bind, {
    autoCommit: true,
  });

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind;
  } else {
    return null;
  }
};

const deleteSql = `
  BEGIN FORMULARIOS_PKG.DELETEOFICINA(
    :idofic,
    :usumov,
    :tipmov 
  ); END;
`;
export const remove = async (ofi) => {
  const bind = Object.assign({}, ofi);
  const result = await database.simpleExecute(deleteSql, bind, {
    autoCommit: true,
  });

  return result.outBinds.rowcount === 1;
};
