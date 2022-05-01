import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
    idofic,
    desofi,
    codofi
  FROM oficinas
`
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  binds.idofic = context.idofic

  query += `WHERE idofic = :idofic`

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async () => {
  let query = baseQuery

  query += `ORDER BY desofi`

  const result = await simpleExecute(query)
  return result.rows
}

const insertSql = `BEGIN FORMULARIOS_PKG.INSERTOFICINA(
    :desofi, 
    :codofi,
    :usumov,
    :tipmov,
    :idofic
  ); END;
`
export const insert = async (bind) => {
  bind.idofic = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idofic = await result.outBinds.idofic
  } catch (error) {
    bind = null
  }

  return bind
}
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATEOFICINA(
  :idofic,
  :desofi, 
  :codofi,
  :usumov,
  :tipmov
); END;
`
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
const deleteSql = `BEGIN FORMULARIOS_PKG.DELETEOFICINA(
    :idofic,
    :usumov,
    :tipmov 
  ); END;
`
export const remove = async (bind) => {
  let result

  try {
    await simpleExecute(deleteSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
