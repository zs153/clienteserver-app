import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  cc.*,TO_CHAR(cc.feccit,'DD/MM/YYYY') "STRFEC",
  oo.desofi
  FROM citas cc
  INNER JOIN oficinas oo ON oo.idofic = cc.oficit
`;
const largeQuery = `SELECT 
  cc.*,oo.desofi,TO_CHAR(cc.feccit,'DD/MM/YYYY') "STRFEC",
  CASE WHEN gg.nifcog IS NULL THEN 'Sí' ELSE 'No' END "COMPLE" FROM citas cc
  INNER JOIN oficinas oo ON oo.idofic = cc.oficit
  LEFT JOIN cognos gg ON gg.nifcog = cc.nifcon
  WHERE cc.stacit <= :stacit AND 
    cc.feccit BETWEEN TRUNC(SYSDATE) AND TRUNC(SYSDATE) +24/24
`;

export const findAll = async (context) => {
  let query = largeQuery;
  let binds = {};

  if (context.oficit !== "-1") {
    query += `AND cc.oficit = :oficit ORDER BY cc.oficit, cc.feccit, cc.horcit`;
    binds.oficit = context.oficit;
  } else {
    query += `ORDER BY cc.oficit, cc.feccit, cc.horcit`;
  }

  binds.stacit = context.stacit;

  const result = await simpleExecute(query, binds);

  return result.rows;
};
export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.idcita) {
    binds.idcita = context.idcita;
    query += `WHERE idcita = :idcita`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows[0];
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
    :obscit, 
    :usumov,
    :tipmov
  ); END;
`;
export const update = async (doc) => {
  const bind = Object.assign({}, doc);
  let result;

  try {
    await simpleExecute(updateSql, bind);

    result = bind;
  } catch (error) {
    result = error;
  }

  return result;
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
