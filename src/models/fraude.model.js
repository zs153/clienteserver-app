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
const estadisticaHitosSql = `SELECT
SUM(p1.proliq) "PROLIQ",
SUM(p1.prosan) "PROSAN",
SUM(p1.liquid) "LIQUID",
SUM(p1.sancio) "SANCIO",
SUM(p1.anulad) "ANUSAN",
SUM(p1.imppli) "IMPPLI",
SUM(p1.imppsa) "IMPPSA",
SUM(p1.impliq) "IMPLIQ",
SUM(p1.impsan) "IMPSAN",
SUM(p1.impanu) "IMPANU",
SUM(p1.proliq+p1.prosan+p1.liquid+p1.sancio) "TOT"
FROM (SELECT hh.tiphit,
    SUM(CASE WHEN hh.stahit = 1 THEN 1 ELSE 0 END) as proliq,
    SUM(CASE WHEN hh.stahit = 2 THEN 1 ELSE 0 END) as prosan,
    SUM(CASE WHEN hh.stahit = 3 THEN 1 ELSE 0 END) as liquid,
    SUM(CASE WHEN hh.stahit = 4 THEN 1 ELSE 0 END) as sancio,
    SUM(CASE WHEN hh.stahit = -1 THEN 1 ELSE 0 END) as anulad,
    SUM(CASE WHEN hh.stahit = 1 THEN hh.imphit ELSE 0 END) as imppli,
    SUM(CASE WHEN hh.stahit = 2 THEN hh.imphit ELSE 0 END) as imppsa,
    SUM(CASE WHEN hh.stahit = 3 THEN hh.imphit ELSE 0 END) as impliq,
    SUM(CASE WHEN hh.stahit = 4 THEN hh.imphit ELSE 0 END) as impsan,
    SUM(CASE WHEN hh.stahit = -1 THEN hh.imphit ELSE 0 END) as impanu    
    FROM fraudes ff
    INNER JOIN movimientosfraude mf ON mf.idfrau = ff.idfrau
    INNER JOIN movimientos mm ON mm.idmovi = mf.idmovi
    INNER JOIN hitosfraude hf ON hf.idfrau = ff.idfrau
    INNER JOIN hitos hh ON hh.idhito = hf.idhito
    WHERE mm.fecmov BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24 
        AND ff.stafra = 2
        AND ff.tipfra = :tipfra
        AND mm.tipmov = 27
    GROUP BY hh.tiphit
) p1
`
const estadisticaOficinaSql = `SELECT 
  oo.desofi,
  SUM(pend) "PEN",
  SUM(adju) "ADJ",
  SUM(resu) "RES",
  SUM(pend+adju+resu) "TOT"
  FROM (
    SELECT ff.ofifra,
    SUM(CASE WHEN ff.stafra = 0 THEN 1 ELSE 0 END) as pend,
    SUM(CASE WHEN ff.stafra = 1 THEN 1 ELSE 0 END) as adju,
    SUM(CASE WHEN ff.stafra = 2 THEN 1 ELSE 0 END) as resu
    FROM fraudes ff
    WHERE ff.tipfra = :tipfra
    GROUP BY ff.ofifra
) p1
INNER JOIN oficinas oo ON oo.idofic = p1.ofifra
GROUP BY oo.desofi
`
const estadisticaSituacionSql = `SELECT
  SUM(CASE WHEN ff.sitfra = 0 THEN 1 ELSE 0 END) "ACTSIT",
  SUM(CASE WHEN ff.sitfra > 0 THEN 1 ELSE 0 END) "CORSIT"
  FROM fraudes ff
  INNER JOIN movimientosfraude mf ON mf.idfrau = ff.idfrau
  INNER JOIN movimientos mm ON mm.idmovi = mf.idmovi
  WHERE mm.fecmov BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24 
    AND ff.stafra = 2
    AND ff.tipfra = :tipfra
    AND mm.tipmov = 27
`
const estadisticaActuacionSql = `SELECT 
    ROUND(hh.fechit) "FECHIT", 
    SUM(CASE WHEN hh.tiphit = 1 THEN 1 ELSE 0 END) "PROLIQ",
    SUM(CASE WHEN hh.tiphit = 2 THEN 1 ELSE 0 END) "PROSAN",
    SUM(CASE WHEN hh.tiphit = 3 THEN 1 ELSE 0 END) "LIQUID",
    SUM(CASE WHEN hh.tiphit = 4 THEN 1 ELSE 0 END) "SANCIO",
    SUM(CASE WHEN hh.stahit = -1 THEN 1 ELSE 0 END) "ANULAD"
    FROM fraudes ff
    INNER JOIN movimientosfraude mf ON mf.idfrau = ff.idfrau
    INNER JOIN movimientos mm ON mm.idmovi = mf.idmovi
    INNER JOIN hitosfraude hf ON hf.idfrau = ff.idfrau
    INNER JOIN hitos hh ON hh.idhito = hf.idhito
    WHERE mm.fecmov BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD') +24/24 
        AND ff.stafra = 2
        AND ff.tipfra = :tipfra
        AND mm.tipmov = 27
    GROUP BY ROUND(hh.fechit)
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
const insertSmsSql = `BEGIN FORMULARIOS_PKG.INSERTSMSFRAUDE(
  :idfrau,
  :texsms,
  :movsms,
  :stasms,
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
export const statHitos = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaHitosSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows[0]
}
export const statOficinas = async (bind) => {
  let result

  delete bind.desfec
  delete bind.hasfec
  try {
    result = await simpleExecute(estadisticaOficinaSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const statSituacion = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaSituacionSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows[0]
}
export const statActuacion = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaActuacionSql, bind)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const insertSms = async (bind) => {
  bind.idsmss = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSmsSql, bind)

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
