import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idthit,
  desthi,
  anusan
FROM tiposhito
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTTIPOHITO(
  :desthi,
  :anusan,
  :usumov,
  :tipmov,
  :idthit
); END;
`
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATETIPOHITO(
  :idthit,
  :desthi,
  :anusan,
  :usumov,
  :tipmov,
); END;
`
const removeSql = `BEGIN FORMULARIOS_PKG.DELETETIPOHITO(
  :idthit,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idthit) {
    binds.idthit = context.idthit
    query += `WHERE idthit = :idthit`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = baseQuery
  let binds = {}

  const result = await simpleExecute(query, binds)
  return result.rows
}

export const insert = async (bind) => {
  bind.idthit = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idthit = await result.outBinds.idthit
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
