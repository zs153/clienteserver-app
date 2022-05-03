import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  ss.*,
  dd.refdoc,
  TO_CHAR(ss.fecsms, 'DD/MM/YYYY') "STRFEC"
FROM smss ss
INNER JOIN smssdocumento sd ON sd.idsmss = ss.idsmss
INNER JOIN documentos dd ON dd.iddocu = sd.iddocu
`;
const largeQuery = `SELECT 
  ss.*,
  dd.refdoc,
  TO_CHAR(ss.fecsms, 'DD/MM/YYYY') "STRFEC"
FROM smss ss
INNER JOIN smssdocumento sd ON sd.idsmss = ss.idsmss
INNER JOIN documentos dd ON dd.iddocu = sd.iddocu
WHERE stasms <= :stasms
`;
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTSMS(
  :texsms, 
  :movsms, 
  :stasms, 
  :iddocu,
  :usumov,
  :tipmov,
  :idsmss
); END;
`;
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATESMS(
  :idsmss,
  :texsms, 
  :stasms, 
  :usumov,
  :tipmov
); END;
`;
const removeSql = `BEGIN FORMULARIOS_PKG.DELETESMS(
  :idsmss,
  :usumov,
  :tipmov 
); END;
`;
const cambioSql = `BEGIN FORMULARIOS_PKG.CAMBIOESTADOSMS(
  :idsmss,
  :stasms,
  :usumov,
  :tipmov 
); END;
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.idsmss) {
    binds.idsmss = context.idsmss;
    query += `WHERE ss.idsmss = :idsmss`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findAll = async (context) => {
  let query = largeQuery;
  let binds = {};

  binds.stasms = context.stasms;
  console.log(query, binds);
  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findByMovil = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.movsms) {
    binds.movsms = context.movsms;
    query += `WHERE movsms = :movsms`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};

export const insert = async (bind) => {
  bind.idsmss = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    const result = await simpleExecute(insertSql, bind);

    bind.idsmss = await result.outBinds.idsmss;
  } catch (error) {
    console.log(error);
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
export const change = async (bind) => {
  let result;

  try {
    await simpleExecute(cambioSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
