import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idsubt,
  dessub
FROM stipos
`
const subtiposTipo = `SELECT 
  st.idtipo,
  ss.idsubt,
  ss.dessub 
FROM stipostipo st 
INNER JOIN stipos ss ON ss.idsubt = st.idsubt 
WHERE st.idtipo = :idtipo
`
const tiposSubtipos = `SELECT 
  st.idtipo,
  ss.idsubt,
  ss.dessub 
FROM stipostipo st 
INNER JOIN stipos ss ON ss.idsubt = st.idsubt
`
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  binds.idsubt = context.idsubt

  query += `WHERE idsubt = :idsubt`

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async () => {
  let query = baseQuery

  query += `ORDER BY dessub`

  const result = await simpleExecute(query)
  return result.rows
}
export const findSubtiposTipo = async (context) => {
  let query = subtiposTipo
  let binds = {}

  binds.idtipo = context.idtipo

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findTiposSubtipos = async () => {
  let query = tiposSubtipos

  const result = await simpleExecute(query)
  return result.rows
}
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTSTIPO(
    :dessub,
    :idtipo, 
    :usumov,
    :tipmov,
    :idsubt
  ); END;
`
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
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATESTIPO(
  :idsubt,
  :dessub,
  :idtold,
  :idtipo,
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
const deleteSql = `BEGIN FORMULARIOS_PKG.DELETESTIPO(
    :idsubt,
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
