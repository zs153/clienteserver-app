import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  idhito,
  TO_CHAR(fechit, 'YYYY-MM-DD') "FECHIT",
  tiphit,
  subhit,
  imphit,
  obshit,
  TO_CHAR(fechit, 'DD/MM/YYYY') "STRFEC"
FROM fraudes
`;
const largeQuery = `SELECT 
  tt.destip,
  ss.dessub
  idhito,
  TO_CHAR(fechit, 'YYYY-MM-DD') "FECHIT",
  tiphit,
  subhit,
  imphit,
  obshit,
  TO_CHAR(fechit, 'DD/MM/YYYY') "STRFEC"
FROM hitos hh
INNER JOIN tipos tt ON tt.idtipo = hh.tiphit
INNER JOIN stipos ss ON ss.idsubt = hh.subhit
`;
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTHITO(
  TO_DATE(:fecfra, 'YYYY-MM-DD'),
  :nifcon,
  :nomcon,
  :emacon,
  :telcon,
  :movcon,
  :reffra,
  :tipfra,
  :ejefra,
  :ofifra,
  :obsfra,
  :funfra,
  :liqfra,
  :stafra,
  :usumov,
  :tipmov,
  :idfrau
); END;
`;
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATEFRAUDE(
  :idfrau,
  TO_DATE(:fecfra,'YYYY-MM-DD'),
  :nifcon, 
  :nomcon, 
  :emacon, 
  :telcon, 
  :movcon, 
  :tipfra, 
  :ejefra, 
  :ofifra, 
  :obsfra,
  :usumov,
  :tipmov
); END;
`;
const removeSql = `BEGIN FORMULARIOS_PKG.DELETEFRAUDE(
  :idfrau,
  :usumov,
  :tipmov 
); END;
`;
const cambioSql = `BEGIN FORMULARIOS_PKG.CAMBIOESTADOFRAUDE(
  :idfrau,
  :liqfra,
  :stafra,
  :usumov,
  :tipmov 
); END;
`;
const estadisticaSql = `SELECT 
  desofi,
  SUM(CASE WHEN stafra = 0 THEN 1 ELSE 0) as pend,
  SUM(CASE WHEN stafra = 1 THEN 1 ELSE 0) as asig,
  SUM(CASE WHEN stafra = 2 THEN 1 ELSE 0) as resu,
  SUM(CASE WHEN stafra = 3 THEN 1 ELSE 0) as remi
FROM (
  SELECT mf.idfrau FROM movimientos mm
  INNER JOIN movimientosfraude mf ON mf.idmovi = mm.idmovi
  WHERE mm.tipmov = 0 AND
    mm.fecmov BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24
) p1
INNER JOIN fraudes ff ON ff.idfrau = p1.idfrau
INNER JOIN oficinas oo ON oo.idofic = ff.ofifra
GROUP BY desofi
ORDER BY desofi
`;
const smsSql = `BEGIN FORMULARIOS_PKG.INSERTSMS(
  :texsms,
  :movsms,
  :stasms,
  :idfrau,
  :usumov,
  :tipmov,
  :idsmss
); END;
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.idfrau) {
    binds.idfrau = context.idfrau;
    query += `WHERE idfrau = :idfrau`;
  }
  if (context.reffra) {
    binds.reffra = context.reffra;
    query += `WHERE reffra = :reffra`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findAll = async (context) => {
  let query = largeQuery;
  let binds = {};

  if (!context.stafra) {
    return null;
  }

  binds.stafra = context.stafra;

  if (context.liqfra) {
    binds.liqfra = context.liqfra;
    query += `AND liqfra = :liqfra`;
  }
  const result = await simpleExecute(query, binds);

  return result.rows;
};

export const insert = async (bind) => {
  bind.idfrau = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    const result = await simpleExecute(insertSql, bind);

    bind.idfrau = await result.outBinds.idfrau;
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
export const stats = async (bind) => {
  let result;

  try {
    result = await simpleExecute(estadisticaSql, bind);
  } catch (error) {
    result = null;
  }

  return result;
};
export const insertSms = async (bind) => {
  bind.idsmss = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    const result = await simpleExecute(smsSql, bind);

    bind.idsmss = await result.outBinds.idsmss;
  } catch (error) {
    bind = null;
  }

  return bind;
};