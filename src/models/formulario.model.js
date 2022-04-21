import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `
  SELECT 
    iddocu,
    TO_CHAR(fecdoc, 'YYYY-MM-DD') "strfec",
    nifcon,
    nomcon,
    emacon,
    telcon,
    movcon,
    refdoc,
    tipdoc,
    ejedoc,
    ofidoc,
    obsdoc,
    fundoc,
    liqdoc,
    stadoc
  FROM documentos
`;
const largeQuery = `
  SELECT 
    oo.desofi,
    tt.destip,
    dd.*,
    TO_CHAR(dd.fecdoc, 'YYYY-MM-DD') "strfec"
  FROM documentos
  INNER JOIN tipos tt ON tt.idtipo = dd.tipdoc
  INNER JOIN oficinas oo ON oo.idofic = dd.ofidoc
`;
export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.id) {
    binds.iddocu = context.id;

    query += `\nWHERE iddocu = :iddocu`;
  } else {
    query = largeQuery;

    if (context.stat) {
      binds.stadoc = context.stat;

      query += `\nWHERE dd.stadoc <= :stadoc 
        ORDER BY dd.idofic, dd.fecdoc`;
    }
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findByRef = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.userid) {
    binds.refdoc = context.ref;

    query += `\nWHERE refdoc = :refdoc`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};

const insertSql = `
  BEGIN FORMULARIOS_PKG.INSERTDOCUMENTO(
    :fecdic, 
    :nifcon, 
    :nomcon, 
    :emacon, 
    :telcon, 
    :movcon, 
    :refdoc, 
    :tipdoc, 
    :ejedoc, 
    :ofidoc, 
    :obsdoc,
    :fundoc,
    :liqdoc,
    :stadoc,
    :usumov,
    :tipmov,
    :iddocu
  ); END;
`;
export const insert = async (doc) => {
  const bind = Object.assign({}, doc);

  bind.iddocu = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  const result = await simpleExecute(insertSql, bind);

  bind.iddocu = result.outBinds.iddocu[0];

  return bind;
};

const updateSql = `
  BEGIN FORMULARIOS_PKG.UPDATEDOCUMENTO(
    :iddocu,
    :fecdic, 
    :nifcon, 
    :nomcon, 
    :emacon, 
    :telcon, 
    :movcon, 
    :refdoc, 
    :tipdoc, 
    :ejedoc, 
    :ofidoc, 
    :obsdoc,
    :fundoc,
    :liqdoc,
    :stadoc,
    :usumov,
    :tipmov,
  ); END;
`;
export const update = async (doc) => {
  const bind = Object.assign({}, doc);
  const result = await simpleExecute(updateSql, bind);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind;
  } else {
    return null;
  }
};

const removeSql = `
  BEGIN FORMULARIOS_PKG.DELETEDOCUMENTO(
    :idDOCU,
    :usumov,
    :tipmov 
  ); END;
`;
export const remove = async (doc) => {
  const bind = Object.assign({}, doc);
  const result = await simpleExecute(removeSql, bind);

  return result.outBinds.rowcount === 1;
};
