import {
  find,
  findAll,
  insert,
  update,
  remove,
  change,
} from '../models/sms.model'

const insertFromRec = (req) => {
  const sms = {
    fecsms: req.body.fecsms,
    texsms: req.body.texsms,
    movsms: req.body.movsms,
    stasms: req.body.stasms,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(sms, movimiento)
}
const updateFromRec = (req) => {
  const sms = {
    idsmss: req.body.idsmss,
    fecsms: req.body.fecsms,
    texsms: req.body.texsms,
    movsms: req.body.movsms,
    stasms: req.body.stasms,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(sms, movimiento)
}
const deleteFromRec = (req) => {
  const sms = {
    idsmss: req.body.documento.idsmss,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(sms, movimiento)
}
const cambioFromRec = (req) => {
  const sms = {
    idsmss: req.body.documento.idsmss,
    stasms: req.body.documento.stasms,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(sms, movimiento)
}

export const sms = async (req, res) => {
  try {
    const context = {}
    context.idsmss = req.body.idsmss

    const rows = await find(context)

    if (rows.length === 1) {
      return res.status(200).json(rows[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const smss = async (req, res) => {
  try {
    const context = {}
    context.stasms = req.body.sms.stasms

    const rows = await findAll(context)

    res.status(200).json(rows)
  } catch (err) {
    res.status(400).end()
  }
}
export const smsByMovil = async (req, res) => {
  try {
    const context = {}
    context.movsms = req.body.sms.movsms

    const rows = await findByMovil(context)

    if (rows.length === 1) {
      res.status(200).json(rows[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

export const add = async (req, res) => {
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
export const mod = async (req, res) => {
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
export const del = async (req, res) => {
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
export const cambioEstado = async (req, res) => {
  try {
    const result = await change(cambioFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
