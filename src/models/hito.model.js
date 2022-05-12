import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idhito,
  TO_CHAR(fechit, 'YYYY-MM-DD') "FECHIT",
  tiphit,
  subthi,
  imphit,
  obshit,
  TO_CHAR(fechit, 'DD/MM/YYYY') "STRFEC"
FROM hitos
`
const largeQuery = `SELECT 
  tt.destip,
  hh.idhito,
  hh.fechit,
  hh.tiphit,
  hh.subthi,
  hh.imphit,
  hh.obshit,
  TO_CHAR(hh.fechit, 'DD/MM/YYYY') "STRFEC"
FROM hitos hh
INNER JOIN hitosfraude hf ON hf.idhito = hh.idhito
INNER JOIN tipos tt ON tt.idtipo = hh.tiphit
WHERE hf.idfrau = :idfrau
`
const insertSql = `BEGIN FORMULARIOS_PKG.INSERTHITO(
  :tiphit,
  :subthi,
  :imphit,
  :obshit,
  :usumov,
  :tipmov,
  :idhito
); END;
`
const updateSql = `BEGIN FORMULARIOS_PKG.UPDATEHITO(
  :idhito,
  :tiphit,
  :subthi,
  :imphit,
  :obshit,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN FORMULARIOS_PKG.DELETEHITO(
  :idhito,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idhito) {
    binds.idhito = context.idhito
    query += `WHERE idhito = :idhito`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = largeQuery
  let binds = {}

  if (!context.idfrau) {
    return null
  }
  binds.idfrau = context.idfrau

  const result = await simpleExecute(query, binds)

  return result.rows
}

export const insert = async (bind) => {
  bind.idhito = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idhito = await result.outBinds.idhito
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
