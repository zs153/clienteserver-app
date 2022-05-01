import {
  findAll,
  findByEmail,
  findByUserid,
  insert,
  update,
  remove,
  register,
  change,
  forgot,
  profile,
} from '../models/usuario.model'

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
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(usuario, movimiento)
}
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
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(usuario, movimiento)
}
const deleteFromRec = (req) => {
  const usuario = {
    idusua: req.body.usuario.idusua,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(usuario, movimiento)
}
const registroFromRec = (req) => {
  const registro = {
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
  }

  return registro
}
const cambioFromRec = (req) => {
  const cambio = {
    idusua: req.body.usuario.idusua,
    pwdusu: req.body.usuario.pwdusu,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(cambio, movimiento)
}
const olvidoFromRec = (req) => {
  const olvido = {
    emausu: req.body.usuario.emausu,
    pwdusu: req.body.usuario.pwdusu,
    tipmov: req.body.usuario.tipmov,
    saltus: req.body.usuario.saltus,
  }

  return olvido
}
const perfilFromRec = (req) => {
  const perfil = {
    idusua: req.body.usuario.idusua,
    nomusu: req.body.usuario.nomusu,
    ofiusu: req.body.usuario.ofiusu,
    emausu: req.body.usuario.emausu,
    telusu: req.body.usuario.telusu,
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return perfil
}

export const getUsuarios = async (req, res) => {
  try {
    const rows = await findAll()

    res.status(200).json(rows)
  } catch (err) {
    res.status(400).end()
  }
}
export const getUsuario = async (req, res) => {
  try {
    const context = {}

    context.userid = req.body.userid

    const rows = await findByUserid(context)

    if (rows.length === 1) {
      return res.status(200).json(rows[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const getUsuarioByEmail = async (req, res) => {
  try {
    const context = {}

    context.emausu = req.body.emausu

    const rows = await findByEmail(context)

    if (context.emausu) {
      if (rows.length === 1) {
        res.status(200).json(rows[0])
      } else {
        res.status(404).end()
      }
    } else {
      res.status(402).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const insertUsuario = async (req, res) => {
  try {
    const result = await insert(insertFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const updateUsuario = async (req, res) => {
  try {
    const result = await update(updateFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const deleteUsuario = async (req, res) => {
  try {
    const result = await remove(deleteFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const registroUsuario = async (req, res) => {
  try {
    const result = await register(registroFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(403).end()
  }
}
export const cambioUsuario = async (req, res) => {
  try {
    const result = await change(cambioFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(403).end()
  }
}
export const olvidoUsuario = async (req, res) => {
  try {
    const result = await forgot(olvidoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(403).end()
  }
}
export const perfilUsuario = async (req, res) => {
  try {
    const result = await profile(perfilFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
