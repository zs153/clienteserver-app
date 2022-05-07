import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  ss.*,
  ff.reffra,
  TO_CHAR(ss.fecsms, 'DD/MM/YYYY') "STRFEC"
FROM smss ss
INNER JOIN smssfraude sf ON sf.idsmss = ss.idsmss
INNER JOIN fraudes ff ON ff.idfrau = sf.idfrau
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTSMS(
  :texsms, 
  :movsms, 
  :stasms, 
  :iddocu,
  :usumov,
  :tipmov,
  :idsmss
); END;
`
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATESMS(
  :idsmss,
  :texsms, 
  :movsms,
  :stasms, 
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FORMULARIOS_PKG.DELETESMS(
  :idsmss,
  :usumov,
  :tipmov 
); END;
`
const cambioSql = `BEGIN FORMULARIOS_PKG.CAMBIOESTADOSMS(
  :idsmss,
  :stasms,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idsmss) {
    binds.idsmss = context.idsmss
    query += `WHERE ss.idsmss = :idsmss`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = baseQuery
  let binds = {}

  binds.stasms = context.stasms
  query += `WHERE ss.stasms <= :stasms`

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findByMovil = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.movsms) {
    binds.movsms = context.movsms
    query += `WHERE movsms = :movsms`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}

export const insert = async (bind) => {
  bind.idsmss = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idsmss = await result.outBinds.idsmss
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
