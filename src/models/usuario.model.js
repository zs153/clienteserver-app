import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `
  SELECT 
    idusua,
    nomusu,
    ofiusu,
    rolusu,
    userid,
    emausu,
    perusu,
    telusu,
    pwdusu,
    stausu
  FROM usuarios
`;
const largeQuery = `
  SELECT 
    uu.idusua,
    uu.nomusu,
    uu.ofiusu,
    uu.rolusu,
    uu.userid,
    uu.emausu,
    uu.perusu,
    uu.telusu,
    uu.pwdusu,
    uu.stausu,
    oo.desofi
  FROM usuarios uu
  INNER JOIN oficinas oo ON oo.idofic = ofiusu
`;
export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  binds.idusua = context.idusua;

  query += `WHERE idusua = :idusua`;

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findAll = async () => {
  let query = largeQuery;

  const result = await simpleExecute(query);
  return result.rows;
};
export const findByUserid = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.userid) {
    binds.userid = context.userid;

    query += `WHERE userid = :userid`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findByEmail = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.emausu) {
    binds.emausu = context.emausu;

    query += `WHERE emausu = :emausu`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};

const insertSql = `
  BEGIN FORMULARIOS_PKG.INSERTUSUARIO(
    :nomusu,
    :ofiusu,
    :rolusu,
    :userid,
    :emausu,
    :perusu,
    :telusu,
    :pwdusu,
    :stausu,
    :usumov,
    :tipmov,
    :idusua
  ); END;
`;
export const insert = async (bind) => {
  let result;

  bind.idusua = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    result = await simpleExecute(insertSql, bind);

    bind.idusua = await result.outBinds.idusua;
    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};

const updateSql = `
  BEGIN FORMULARIOS_PKG.UPDATEUSUARIO(
    :idusua,
    :nomusu, 
    :ofiusu, 
    :rolusu, 
    :userid, 
    :emausu, 
    :perusu, 
    :telusu, 
    :stausu, 
    :usumov, 
    :tipmov
  ); END;
`;
export const update = async (bind) => {
  let result;

  try {
    result = await simpleExecute(updateSql, bind);
  } catch (error) {
    result = null;
  }
};

const removeSql = `
  BEGIN FORMULARIOS_PKG.DELETEUSUARIO(
    :idusua,
    :usumov,
    :tipmov 
  ); END;
`;
export const remove = async (bind) => {
  let result;

  try {
    await simpleExecute(removeSql, bind);
    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};

const registroSql = `
  BEGIN FORMULARIOS_PKG.REGISTROUSUARIO(
    :nomusu, 
    :ofiusu, 
    :rolusu, 
    :userid, 
    :emausu, 
    :perusu, 
    :telusu, 
    :pwdusu, 
    :stausu, 
    :tipmov,
    :saltus, 
    :idusua
  ); END;
`;
export const registro = async (user) => {
  const bind = Object.assign({}, user);

  bind.idusua = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  const result = await simpleExecute(registroSql, bind);

  bind.idusua = result.outBinds.idusua;
  return bind;
};

const cambioSql = `
  BEGIN FORMULARIOS_PKG.CHANGEPASSWORD(
    :idusua,
    :pwdusu, 
    :usumov,
    :tipmov
  ); END;
`;
export const cambio = async (user) => {
  const bind = Object.assign({}, user);
  const result = await simpleExecute(cambioSql, bind);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind;
  } else {
    return null;
  }
};

const olvidoSql = `
  BEGIN FORMULARIOS_PKG.FORGOTPASSWORD(
    :emausu,
    :pwdusu, 
    :tipmov,
    :saltus
  ); END;
`;
export const olvido = async (user) => {
  const bind = Object.assign({}, user);
  const result = await simpleExecute(olvidoSql, bind);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind;
  } else {
    return null;
  }
};

const perfilSql = `
  BEGIN FORMULARIOS_PKG.UPDATEPERFILUSUARIO(
    :idusua,
    :nomusu,
    :ofiusu,
    :emausu,
    :telusu, 
    :usumov,
    :tipmov
  ); END;
`;
export const perfil = async (user) => {
  const bind = Object.assign({}, user);
  const result = await simpleExecute(perfilSql, bind);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind;
  } else {
    return null;
  }
};
