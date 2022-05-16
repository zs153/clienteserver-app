import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT
  tf.destip,
  ff.idfrau,
  TO_CHAR(ff.fecfra, 'YYYY-MM-DD') "FECFRA",
  ff.nifcon,
  ff.nomcon,
  ff.emacon,
  ff.telcon,
  ff.movcon,
  ff.reffra,
  ff.tipfra,
  ff.ejefra,
  ff.ofifra,
  ff.obsfra,
  ff.funfra,
  ff.liqfra,
  ff.stafra,
  ff.sitfra,
  TO_CHAR(ff.fecfra, 'DD/MM/YYYY') "STRFEC"
FROM fraudes ff
INNER JOIN tiposfraude tf ON tf.idtipo = ff.tipfra
`
const largeQuery = `SELECT 
  oo.desofi,
  tt.destip,
  idfrau,
  fecfra,
  nifcon,
  nomcon,
  emacon,
  telcon,
  movcon,
  reffra,
  tipfra,
  ejefra,
  ofifra,
  obsfra,
  funfra,
  liqfra,
  stafra,
  sitfra,
  TO_CHAR(ff.fecfra, 'DD/MM/YYYY') "STRFEC"
FROM fraudes ff
INNER JOIN tiposfraude tt ON tt.idtipo = ff.tipfra
INNER JOIN oficinas oo ON oo.idofic = ff.ofifra
LEFT JOIN subtipos st ON st.idsubt = ff.sitfra
WHERE ff.stafra <= :stafra
`
const hitosFraudeQuery = `SELECT 
  th.destip,
  hh.idhito,
  TO_CHAR(hh.fechit, 'YYYY-MM-DD') "FECHIT",
  hh.tiphit,
  TO_CHAR(hh.imphit) "IMPHIT",
  hh.obshit,
  hh.stahit,
  TO_CHAR(hh.fechit, 'DD/MM/YYYY') "STRFEC"
FROM hitos hh
INNER JOIN hitosfraude hf ON hf.idhito = hh.idhito
INNER JOIN tiposhito th ON th.idtipo = hh.tiphit
WHERE hf.idfrau = :idfrau
`
const eventosFraudeQuery = `SELECT 
  tt.destip,
  ee.*,
  TO_CHAR(ee.feceve, 'DD/MM/YYYY') "STRFEC"
FROM eventos ee
INNER JOIN eventosfraude ef ON ef.ideven = ee.ideven
INNER JOIN tiposevento tt ON tt.idtipo = ee.tipeve
WHERE ef.idfrau = :idfrau
`
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
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTFRAUDE(
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
  :sitfra,
  :usumov,
  :tipmov,
  :idfrau
); END;
`
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
`
const removeSql = `BEGIN FORMULARIOS_PKG.DELETEFRAUDE(
  :idfrau,
  :usumov,
  :tipmov 
); END;
`
const cambioSql = `BEGIN FORMULARIOS_PKG.CAMBIOESTADOFRAUDE(
  :idfrau,
  :liqfra,
  :stafra,
  :usumov,
  :tipmov 
); END;
`
const situacionSql = `BEGIN FORMULARIOS_PKG.CAMBIOSITUACIONFRAUDE(
  :idfrau,
  :liqfra,
  :stafra,
  :sitfra,
  :usumov,
  :tipmov 
); END;
`
const smsSql = `BEGIN FORMULARIOS_PKG.INSERTSMSFRAUDE(
  :texsms,
  :movsms,
  :stasms,
  :idfrau,
  :usumov,
  :tipmov,
  :idsmss
); END;
`
const insertHitoSql = `BEGIN FORMULARIOS_PKG.INSERTHITOFRAUDE(
  :idfrau,
  :tiphit,
  :imphit,
  :obshit,
  :stahit,
  :usumov,
  :tipmov,
  :idhito
); END;
`
const insertEventoSql = `BEGIN FORMULARIOS_PKG.INSERTEVENTOFRAUDE(
  :idfrau,
  :tipeve,
  :obseve,
  :usumov,
  :tipmov,
  :ideven
); END;
`
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idfrau) {
    binds.idfrau = context.idfrau
    query += `WHERE ff.idfrau = :idfrau`
  }
  if (context.reffra) {
    binds.reffra = context.reffra
    query += `WHERE ff.reffra = :reffra`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = largeQuery
  let binds = {}

  if (!context.stafra) {
    return null
  }

  binds.stafra = context.stafra

  if (context.liqfra) {
    binds.liqfra = context.liqfra
    query += `AND ff.liqfra = :liqfra`
  }

  const result = await simpleExecute(query, binds)

  return result.rows
}
export const findHitosFraude = async (context) => {
  let query = hitosFraudeQuery
  let binds = {}

  binds.idfrau = context.idfrau

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findEventosFraude = async (context) => {
  let query = eventosFraudeQuery
  let binds = {}

  binds.idfrau = context.idfrau

  const result = await simpleExecute(query, binds)
  return result.rows
}

export const insert = async (bind) => {
  bind.idfrau = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idfrau = await result.outBinds.idfrau
  } catch (error) {
    bind = null
  }

  return bind
}
export const update = async (bind) => {
  let result

  try {
    await simpleExecute(updateSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const remove = async (bind) => {
  let result

  try {
    await simpleExecute(removeSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const change = async (bind) => {
  let result

  try {
    await simpleExecute(cambioSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const situacion = async (bind) => {
  let result

  try {
    await simpleExecute(situacionSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const stats = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaSql, bind)
  } catch (error) {
    result = null
  }

  return result
}
export const insertSms = async (bind) => {
  bind.idsmss = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(smsSql, bind)

    bind.idsmss = await result.outBinds.idsmss
  } catch (error) {
    bind = null
  }

  return bind
}
export const insertHito = async (bind) => {
  bind.idhito = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertHitoSql, bind)

    bind.idhito = await result.outBinds.idhito
  } catch (error) {
    bind = null
  }

  return bind
}
export const insertEvento = async (bind) => {
  bind.ideven = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertEventoSql, bind)

    bind.ideven = await result.outBinds.ideven
  } catch (error) {
    bind = null
  }

  return bind
}
