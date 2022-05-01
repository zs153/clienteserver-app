import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  iddocu,
  TO_CHAR(fecdoc, 'YYYY-MM-DD') "STRFEC",
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
`
const largeQuery = `SELECT 
  oo.desofi,
  tt.destip,
  dd.*,
  TO_CHAR(dd.fecdoc, 'YYYY-MM-DD') "STRFEC"
FROM documentos dd
INNER JOIN tipos tt ON tt.idtipo = dd.tipdoc
INNER JOIN oficinas oo ON oo.idofic = dd.ofidoc
WHERE dd.stadoc IN (0,:stadoc)
ORDER BY dd.ofidoc, dd.fecdoc
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTDOCUMENTO(
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
  :usumov,
  :tipmov,
  :iddocu
); END;
`
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATEDOCUMENTO(
  :iddocu,
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
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FORMULARIOS_PKG.DELETEDOCUMENTO(
  :iddocu,
  :usumov,
  :tipmov 
); END;
`
const cambioSql = `BEGIN FORMULARIOS_PKG.CAMBIOESTADOFORMULARIO(
  :iddocu,
  :liqdoc,
  :stadoc,
  :usumov,
  :tipmov 
); END;
`
const estadisticaSql = `SELECT 
  desofi,
  SUM(CASE WHEN stadoc = 0 THEN 1 ELSE 0) as pend,
  SUM(CASE WHEN stadoc = 1 THEN 1 ELSE 0) as asig,
  SUM(CASE WHEN stadoc = 2 THEN 1 ELSE 0) as resu,
  SUM(CASE WHEN stadoc = 3 THEN 1 ELSE 0) as remi
FROM (
  SELECT md.iddocu FROM movimientos mm
  INNER JOIN movimientosdocumento md ON md.idmovi = mm.idmovi
  WHERE mm.tipmov = 0 AND
    mm.fecmov BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') -1 24/24 AND TO_DATE(:hasfec, 'YYYY-MM-DD') 24/24
) p1
INNER JOIN documentos dd ON dd.iddocu = p1.iddocu
INNER JOIN oficinas oo ON oo.idofic = dd.ofidoc
GROUP BY desofi
ORDER BY desofi
`
const smsSql = `BEGIN FORMULARIOS_PKG.INSERTSMS(
  :texsms,
  :movsms,
  :stasms,
  :iddocu,
  :usumov,
  :tipmov,
  :idsmss
); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  binds.iddocu = context.iddocu
  query += `WHERE iddocu = :iddocu`

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = largeQuery
  let binds = {}

  binds.stadoc = context.stadoc
  console.log(query)
  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findByRef = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.refdoc) {
    binds.refdoc = context.refdoc

    query += `\nWHERE refdoc = :refdoc`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findByLiq = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.refdoc) {
    binds.liqdoc = context.liqdoc

    query += `WHERE liqdoc = :liqdoc`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}

export const insert = async (bind) => {
  bind.iddocu = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.iddocu = await result.outBinds.iddocu
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
export const stats = async (bind) => {
  let result

  try {
    result = await simpleExecute(estadisticaSql, bind)
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
