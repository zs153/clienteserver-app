import {
  findAll,
  findByEmail,
  findByUserid,
  insert,
  update,
  remove,
  registro,
  cambio,
  olvido,
  perfil,
} from "../models/usuario.model";

const insertFromRec = (req) => {
  const usuario = {
    nomusu: req.body.usuario.nomusu,
    ofiusu: req.body.usuario.ofiusu,
    rolusu: req.body.usuario.rolusu,
    userid: req.body.usuario.userid,
    emausu: req.body.usuario.emausu,
    perusu: req.body.usuario.perusu,
    telusu: req.body.usuario.telusu,
    pwdusu: req.body.usuario.pwdusu,
    stausu: req.body.usuario.stausu,
  };

  return usuario;
};
const updateFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.idusua,
    nomusu: req.body.usuario.nomusu,
    ofiusu: req.body.usuario.ofiusu,
    rolusu: req.body.usuario.rolusu,
    userid: req.body.usuario.userid,
    emausu: req.body.usuario.emausu,
    perusu: req.body.usuario.perusu,
    telusu: req.body.usuario.telusu,
    stausu: req.body.usuario.stausu,
  };

  return usuario;
};
const deleteFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.idusua,
  };

  return usuario;
};
const movimientoFromRec = (req) => {
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  };

  return movimiento;
};
export const getUsuarios = async (req, res) => {
  try {
    const rows = await findAll();

    res.status(200).json(rows);
  } catch (err) {
    res.status(400).end();
  }
};
export const getUsuario = async (req, res) => {
  try {
    const context = {};

    context.userid = req.body.userid;

    const rows = await findByUserid(context);

    if (rows.length === 1) {
      return res.status(200).json(rows[0]);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const getUsuarioByEmail = async (req, res) => {
  try {
    const context = {};

    context.emausu = req.body.emausu;

    const rows = await findByEmail(context);

    if (context.emausu) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(402).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const insertUsuario = async (req, res) => {
  try {
    const doc = Object.assign(insertFromRec(req), movimientoFromRec(req));
    const result = await insert(doc);

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const updateUsuario = async (req, res) => {
  try {
    const doc = Object.assign(updateFromRec(req), movimientoFromRec(req));
    const result = await update(doc);

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const deleteUsuario = async (req, res) => {
  try {
    const doc = Object.assign(deleteFromRec(req), movimientoFromRec(req));
    const result = await remove(doc);

    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
const registroFromRec = (req) => {
  const usuario = {
    nomusu: req.body.usuario.nomusu,
    ofiusu: req.body.usuario.ofiusu,
    rolusu: req.body.usuario.rolusu,
    userid: req.body.usuario.userid,
    emausu: req.body.usuario.emausu,
    perusu: req.body.usuario.perusu,
    telusu: req.body.usuario.telusu,
    stausu: req.body.usuario.stausu,
    pwdusu: req.body.usuario.pwdusu,
    tipmov: req.body.usuario.tipmov,
    saltus: req.body.usuario.saltus,
  };

  return usuario;
};
export const registroUsuario = async (req, res) => {
  try {
    let usuario = registroFromRec(req);

    usuario = await registro(usuario);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(403).end();
  }
};
const cambioFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.idusua,
    pwdusu: req.body.usuario.pwdusu,
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  };

  return usuario;
};
export const cambioPasswordUsuario = async (req, res) => {
  try {
    let usuario = cambioFromRec(req);

    usuario = await cambio(usuario);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(403).end();
  }
};
const olvidoFromRec = (req) => {
  const usuario = {
    emausu: req.body.usuario.emausu,
    pwdusu: req.body.usuario.pwdusu,
    tipmov: req.body.usuario.tipmov,
    saltus: req.body.usuario.saltus,
  };

  return usuario;
};
export const olvidoPasswordUsuario = async (req, res) => {
  try {
    let usuario = olvidoFromRec(req);

    usuario = await olvido(usuario);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(403).end();
  }
};
const perfilFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.idusua,
    nomusu: req.body.usuario.nomusu,
    ofiusu: req.body.usuario.ofiusu,
    emausu: req.body.usuario.emausu,
    telusu: req.body.usuario.telusu,
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  };

  return usuario;
};
export const perfilUsuario = async (req, res) => {
  try {
    let usuario = perfilFromRec(req);

    await perfil(usuario);

    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).end();
  }
};
