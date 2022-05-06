import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idsubt,
  dessub
FROM stipos
`
const subtiposTipo = `SELECT 
  st.idsubt,
  ss.idsubt,
  ss.dessub 
FROM stipostipo st 
INNER JOIN stipos ss ON ss.idsubt = st.idsubt 
WHERE st.idsubt = :idsubt
`
const tiposSubtipos = `SELECT 
  st.idsubt,
  ss.idsubt,
  ss.dessub 
FROM stipostipo st 
INNER JOIN stipos ss ON ss.idsubt = st.idsubt
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTSTIPO(
    :dessub,
    :idsubt, 
    :usumov,
    :tipmov,
    :idsubt
  ); END;
`
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATESTIPO(
  :idsubt,
  :dessub,
  :idtold,
  :idsubt,
  :usumov,
  :tipmov
); END;
`
const deleteSql = `BEGIN FORMULARIOS_PKG.DELETESTIPO(
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
