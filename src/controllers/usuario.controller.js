import {
  find,
  findByEmail,
  findByUserid,
  insert,
  update,
  remove,
  registro,
  cambio,
} from "../models/usuario.model";

const getUsuarioFromRec = (req) => {
  const usuario = {
    idusua: req.body.idusua,
    nomusu: req.body.nomusu,
    ofiusu: req.body.ofiusu,
    rolusu: req.body.rolusu,
    userid: req.body.userid,
    emausu: req.body.emausu,
    perusu: req.body.perusu,
    telusu: req.body.telusu,
    stausu: req.body.stausu,
  };

  return usuario;
};
export const getUsuarios = async (req, res) => {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);

    const rows = await find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
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
export const insertUsuario = async (req, res, next) => {
  try {
    let usuario = getUsuarioFromRec(req);
    usuario.movimiento = {
      usumov: req.body.movimiento.usuarioMov,
      tipmov: req.body.movimiento.tipoMov,
    };
    usuario = await insert(usuario);

    res.status(201).json(usuario);
  } catch (err) {
    next(err);
  }
};
export const updateUsuario = async (req, res, next) => {
  try {
    let usuario = getUsuarioFromRec(req);
    usuario.movimiento = {
      usumov: req.body.movimiento.usuarioMov,
      tipmov: req.body.movimiento.tipoMov,
    };
    usuario = await update(usuario);

    if (usuario !== null) {
      res.status(200).json(usuario);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
};
export const deleteUsuario = async (req, res, next) => {
  try {
    let usuario = getUsuarioFromRec(req);
    usuario.movimiento = {
      usumov: req.body.movimiento.usuarioMov,
      tipmov: req.body.movimiento.tipoMov,
    };
    const success = await remove(usuario);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
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
    res.status(201).json(usuario);
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
    res.status(201).json(usuario);
  } catch (err) {
    res.status(403).end();
  }
};
