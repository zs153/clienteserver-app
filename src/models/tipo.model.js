import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
    idtipo,
    destip,
    ayutip,
    orgtip
  FROM tipos
`
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  binds.idtipo = context.idtipo

  query += `WHERE idtipo = :idtipo`

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async () => {
  let query = baseQuery

  query += `ORDER BY destip`

  const result = await simpleExecute(query)
  return result.rows
}

const insertSql = `BEGIN FORMULARIOS_PKG.INSERTTIPO(
    :destip, 
    :ayutip,
    :orgtip,
    :usumov,
    :tipmov,
    :idtipo
  ); END;
`
export const insert = async (bind) => {
  bind.idtipo = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idtipo = await result.outBinds.idtipo
  } catch (error) {
    bind = null
  }

  return bind
}
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATETIPO(
  :idtipo,
  :destip, 
  :ayutip,
  :orgtip,
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
const deleteSql = `BEGIN FORMULARIOS_PKG.DELETETIPO(
    :idtipo,
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
