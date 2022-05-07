import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  cc.*,TO_CHAR(cc.feccit,'DD/MM/YYYY') "STRFEC",
  oo.desofi
  FROM citas cc
  INNER JOIN oficinas oo ON oo.idofic = cc.oficit
`
const largeQuery = `SELECT 
  cc.*,oo.desofi,TO_CHAR(cc.feccit,'DD/MM/YYYY') "STRFEC",
  CASE WHEN gg.nifcog IS NULL THEN 'Sí' ELSE 'No' END "COMPLE" FROM citas cc
  INNER JOIN oficinas oo ON oo.idofic = cc.oficit
  LEFT JOIN cognos gg ON gg.nifcog = cc.nifcon
  WHERE cc.stacit <= :stacit
    AND cc.feccit BETWEEN TRUNC(SYSDATE) AND TRUNC(SYSDATE) +:dias +24/24
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTCITA(
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
`
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATECITA(
  :idcita,
  :obscit, 
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FORMULARIOS_PKG.DELETECITA(
  :idcita,
  :usumov,
  :tipmov 
); END;
`
const asignarSql = `BEGIN FORMULARIOS_PKG.ASIGNARCITA(
  :idcita,
  :stacit,
  TO_DATE(:fecdoc, 'YYYY-MM-DD'),
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

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idcita) {
    binds.idcita = context.idcita
    query += `WHERE idcita = :idcita`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = largeQuery
  let binds = {}

  binds.stacit = context.stacit
  binds.dias = 1

  if (context.dias) {
    binds.dias = context.dias
  }
  if (context.oficit !== '0') {
    binds.oficit = context.oficit
    query += `AND cc.oficit = :oficit
    `
  }
  query += `ORDER BY cc.oficit, cc.feccit, cc.horcit`

  const result = await simpleExecute(query, binds)
  return result.rows
}

export const insert = async (bind) => {
  bind.idcita = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idcita = await result.outBinds.idcita
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
export const asignar = async (bind) => {
  bind.iddocu = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(asignarSql, bind)

    bind.iddocu = await result.outBinds.iddocu
  } catch (error) {
    bind = null
  }

  return bind
}
