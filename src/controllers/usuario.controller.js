import Usuario from "../models/usuario.model";
import bcrypt from "bcrypt";

let usuario = new Usuario();

export const getUsuarios = async (req, res) => {
  const { err, dat } = await usuario.getUsuarios();

  if (err) {
    return res.status(404).json({ err });
  } else {
    return res.status(200).json({ dat });
  }
};
export const getUsuario = async (req, res) => {
  usuario.userid = req.body.userid;
  try {
    const { err, dat } = await usuario.getUsuarioByUserID();

    if (err) {
      res.status(412).send(err);
    } else {
      res.status(202).send(usuario);
    }
  } catch (error) {
    return res.status(404).json(err);
  }
};
export const insertUsuario = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;

  try {
    const passSalt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(req.body.usuario.userid, passSalt);

    // usuario
    usuario.nombre = req.body.usuario.nomusu;
    usuario.oficina = req.body.usuario.ofiusu;
    usuario.rol = req.body.usuario.rolusu;
    usuario.userID = req.body.usuario.userid;
    usuario.email = req.body.usuario.emausu;
    usuario.perfil = req.body.usuario.perusu;
    usuario.telefono = req.body.usuario.telusu;
    usuario.password = passHash;
    usuario.estado = req.body.usuario.stausu;
    // movimiento
    usuario.movimiento.usuario = usuarioMov;
    usuario.movimiento.tipo = tipoMov;

    const { err, dat } = await usuario.insert();

    if (err) {
      res.status(404).json(err);
    } else {
      usuario.id = dat.p_idusua;

      res.status(202).json(usuario);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateUsuario = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;

  try {
    usuario.id = req.body.usuario.idusua;
    usuario.nombre = req.body.usuario.nomusu;
    usuario.oficina = req.body.usuario.ofiusu;
    usuario.rol = req.body.usuario.rolusu;
    usuario.userID = req.body.usuario.userid;
    usuario.email = req.body.usuario.emausu;
    usuario.perfil = req.body.usuario.perusu;
    usuario.telefono = req.body.usuario.telusu;
    usuario.estado = req.body.usuario.stausu;
    // movimiento
    usuario.movimiento.usuario = usuarioMov;
    usuario.movimiento.tipo = tipoMov;

    const { err, dat } = await usuario.update();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(202).json(usuario);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
export const deleteUsuario = async (req, res) => {
  const { usuarioMov, tipoMov } = req.body.movimiento;

  try {
    // usuario
    usuario.id = req.body.usuario.idusua;
    // movimiento
    usuario.movimiento.usuario = usuarioMov;
    usuario.movimiento.tipo = tipoMov;

    const { err, dat } = await usuario.delete();

    if (err) {
      res.status(404).json({ err });
    } else {
      res.status(204).json(usuario);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
export const cambioPassword = async (req, res) => {
  const { id, password } = req.body.usuario;
  const { usuarioMov, tipoMov } = req.body.movimiento;

  try {
    const passSalt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, passSalt);

    usuario.id = id;
    usuario.password = passHash;
    // movimiento
    usuario.movimiento.usuario = usuarioMov;
    usuario.movimiento.tipo = tipoMov;

    const { err, dat } = await usuario.cambioPassword();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(202).json(usuario);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
export const updatePerfil = async (req, res) => {
  const { id, nombre, email, telefono } = req.body.usuario;
  const { usuarioMov, tipoMov } = req.body.movimiento;
  try {
    usuario.id = id;
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.telefono = telefono;
    // movimiento
    usuario.movimiento.usuario = usuarioMov;
    usuario.movimiento.tipo = tipoMov;

    const { err, dat } = await usuario.updatePerfil();

    if (err) {
      res.status(404).json(err);
    } else {
      res.status(202).json(usuario);
    }
  } catch (error) {
    res.status(405).json(error);
  }
};
