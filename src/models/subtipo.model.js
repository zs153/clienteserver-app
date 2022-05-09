import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  ss.idsubt,
  ss.dessub,
  ss.idtipo,
  tt.destip
FROM stipos ss
INNER JOIN tipos tt ON tt.idtipo = ss.idtipo
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTSTIPO(
    :dessub,
    :idtipo, 
    :usumov,
    :tipmov,
    :idsubt
  ); END;
`
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATESTIPO(
  :idsubt,
  :dessub,
  :idtipo,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FORMULARIOS_PKG.DELETESTIPO(
    :idsubt,
    :usumov,
    :tipmov 
  ); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idsubt) {
    binds.idsubt = context.idsubt
    query += `WHERE idsubt = :idsubt`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = baseQuery

  const result = await simpleExecute(query)

  return result.rows
}
export const findSubtiposTipo = async (context) => {
  let query = subtiposTipo
  let binds = {}

  binds.idsubt = context.idsubt

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findTiposSubtipos = async () => {
  let query = tiposSubtipos

  const result = await simpleExecute(query)
  return result.rows
}

export const insert = async (bind) => {
  bind.idsubt = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idsubt = await result.outBinds.idsubt
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
