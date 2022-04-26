import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  cc.*,oo.desofi,TO_CHAR(cc.feccit,'DD/MM/YYYY') "STRFEC",
  CASE WHEN gg.nifcog IS NULL THEN 'Sí' ELSE 'No' END "COMPLE" FROM citas cc
  INNER JOIN oficinas oo ON oo.idofic = cc.oficit
  LEFT JOIN cognos gg ON gg.nifcog = cc.nifcon
  WHERE cc.stacit <= :stacit AND 
    cc.feccit BETWEEN TRUNC(SYSDATE) +8/24 AND TRUNC(SYSDATE) +1 +20/24
  ORDER BY cc.oficit, cc.feccit, cc.horcit`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  binds.stacit = context.stacit;
  const result = await simpleExecute(query, binds);

  return result.rows;
};
export const findById = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.idcita) {
    binds.idcita = context.idcita;

    query += `\nWHERE idcita = :idcita`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
const insertSql = `
  BEGIN FORMULARIOS_PKG.INSERTCITA(
    :orgcit, 
    :oficit, 
    :feccit, 
    :horcit, 
    :nifcon, 
    :nomcon, 
    :telcon, 
    :descit, 
    :notcit, 
    :obscit, 
    :stacir,
    :usumov,
    :tipmov,
    :idcita
  ); END;
`;
export const insert = async (doc) => {
  const bind = Object.assign({}, doc);

  bind.idcita = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  const result = await simpleExecute(insertSql, bind);

  bind.idcita = result.outBinds.idcita[0];

  return bind;
};
const updateSql = `
  BEGIN FORMULARIOS_PKG.UPDATECITA(
    :idcita,
    :orgcit, 
    :oficit, 
    :feccit, 
    :horcit, 
    :nifcon, 
    :nomcon, 
    :telcon, 
    :descit, 
    :notcit, 
    :obscit, 
    :stacir,
    :usumov,
    :tipmov
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
  BEGIN FORMULARIOS_PKG.DELETECITA(
    :idcita,
    :usumov,
    :tipmov 
  ); END;
`;
export const remove = async (doc) => {
  const bind = Object.assign({}, doc);
  const result = await simpleExecute(removeSql, bind);

  return result.outBinds.rowcount === 1;
};
const asinarSql = `
  BEGIN FORMULARIOS_PKG.ASIGNARCITA(
    :idcita,
    :stacit,
    :fecdoc, 
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
    :liqdoc,
    :stadoc,
    :usumov,
    :tipmov 
  ); END;
`;
export const asignar = async (doc) => {
  const bind = Object.assign({}, doc);
  const result = await simpleExecute(asignarSql, bind);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind;
  } else {
    return null;
  }
};
