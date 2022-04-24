import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `
  SELECT 
    iddocu,
    TO_CHAR(fecdoc, 'YYYY-MM-DD') "strfec",
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
const largeQuery = `
  SELECT 
    oo.desofi,
    tt.destip,
    dd.*,
    TO_CHAR(dd.fecdoc, 'YYYY-MM-DD') "strfec"
  FROM documentos
  INNER JOIN tipos tt ON tt.idtipo = dd.tipdoc
  INNER JOIN oficinas oo ON oo.idofic = dd.ofidoc
  WHERE stadoc <= :stadoc
`
export const find = async (context) => {
  let query = largeQuery
  let binds = {}

  binds.stadoc = context.stadoc
  binds.liqdoc = context.liqdoc
  if (context.liqdoc !== 'ADMIN') {
    query += `\nAND liqdoc = :liqdoc`
  }
  query += `\nORDER BY dd.idofic, dd.fecdoc`

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findById = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.userid) {
    binds.refdoc = context.ref

    query += `\nWHERE iddocu = :iddocu`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findByRef = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.userid) {
    binds.refdoc = context.refdoc

    query += `\nWHERE refdoc = :refdoc`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
const insertSql = `
  BEGIN FORMULARIOS_PKG.INSERTDOCUMENTO(
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
export const insert = async (doc) => {
  const bind = Object.assign({}, doc)

  bind.iddocu = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  const result = await simpleExecute(insertSql, bind)

  bind.iddocu = result.outBinds.iddocu[0]

  return bind
}
const updateSql = `
  BEGIN FORMULARIOS_PKG.UPDATEDOCUMENTO(
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
    :tipmov,
  ); END;
`
export const update = async (doc) => {
  const bind = Object.assign({}, doc)
  const result = await simpleExecute(updateSql, bind)

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind
  } else {
    return null
  }
}
const removeSql = `
  BEGIN FORMULARIOS_PKG.DELETEDOCUMENTO(
    :iddocu,
    :usumov,
    :tipmov 
  ); END;
`
export const remove = async (doc) => {
  const bind = Object.assign({}, doc)
  const result = await simpleExecute(removeSql, bind)

  return result.outBinds.rowcount === 1
}
const estadisticaSql = `
  SELECT 
    desofi,
    SUM(CASE WHEN stadoc = 0 THEN 1 ELSE 0) as pend,
    SUM(CASE WHEN stadoc = 1 THEN 1 ELSE 0) as asig,
    SUM(CASE WHEN stadoc = 2 THEN 1 ELSE 0) as resu,
    SUM(CASE WHEN stadoc = 3 THEN 1 ELSE 0) as remi
  FROM (
    SELECT md.iddocu FROM movimientos mm
    INNER JOIN movimientosdocumento md ON md.idmovi = mm.idmovi
    WHERE mm.tipmov = 0 AND
      mm.fecmov BETWEEN TO_DATE(:desfec, 'YYYY-MM-DD') AND TO_DATE(:hasfec, 'YYYY-MM-DD')      
  ) p1
  INNER JOIN documentos dd ON dd.iddocu = p1.iddocu
  INNER JOIN oficinas oo ON oo.idofic = dd.ofidoc
  GROUP BY desofi
  ORDER BY desofi
`
export const estadistica = async (doc) => {
  const bind = Object.assign({}, doc)
  const result = await simpleExecute(removeSql, bind)

  return result
}
const cambioSql = `
  BEGIN FORMULARIOS_PKG.CAMBIOESTADOFORMULARIO(
    :iddocu,
    :liqdoc,
    :stadoc,
    :usumov,
    :tipmov 
  ); END;
`
export const cambio = async (doc) => {
  const bind = Object.assign({}, doc)
  const result = await simpleExecute(cambioSql, bind)

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind
  } else {
    return null
  }
}
