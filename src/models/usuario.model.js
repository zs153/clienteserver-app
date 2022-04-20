import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const outFormat = oracledb.OUT_FORMAT_OBJECT;
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
  INNER JOIN oficinas oo ON oo.idofic = ofiusu
`;
export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.id) {
    binds.idusua = context.id;

    query += `\nWHERE idusua = :idusua`;
  }

  const result = await simpleExecute(query, binds, { outFormat });
  return result.rows;
};
export const findByUserid = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.userid) {
    binds.userid = context.userid;

    query += `\nWHERE userid = :userid`;
  }

  const result = await simpleExecute(query, binds, { outFormat });
  return result.rows;
};
export const findByEmail = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.emausu) {
    binds.emausu = context.emausu;

    query += `\nWHERE emausu = :emausu`;
  }

  const result = await simpleExecute(query, binds, { outFormat });
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
export const insert = async (user) => {
  const bind = Object.assign({}, user);

  bind.idusua = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  const result = await simpleExecute(insertSql, bind, {
    autoCommit: true,
  });

  bind.idusua = result.outBinds.idusua[0];

  return bind;
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
    :pwdusu, 
    :stausu, 
    :usumov, 
    :tipmov
  ); END;
`;
export const update = async (user) => {
  const bind = Object.assign({}, user);
  const result = await simpleExecute(updateSql, bind, {
    autoCommit: true,
  });

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind;
  } else {
    return null;
  }
};

const removeSql = `
  BEGIN FORMULARIOS_PKG.DELETEUSUARIO(
    :idusua,
    :usumov,
    :tipmov 
  ); END;
`;
export const remove = async (user) => {
  const bind = Object.assign({}, user);
  const result = await simpleExecute(removeSql, bind, {
    autoCommit: true,
  });

  return result.outBinds.rowcount === 1;
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

  const result = await simpleExecute(registroSql, bind, {
    autoCommit: true,
  });

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
  const result = await simpleExecute(cambioSql, bind, {
    autoCommit: true,
  });

  if (result.rowsAffected && result.rowsAffected === 1) {
    return bind;
  } else {
    return null;
  }
};
