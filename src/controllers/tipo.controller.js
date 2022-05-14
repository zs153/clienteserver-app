import * as DAL from '../models/tipo.model'

const insertFromRec = (req) => {
  const tipoHitoHito = {
    desthi: req.body.tipoHitoHito.desthi,
    anusan: req.body.tipoHitoHito.anusan,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(tipoHitoHito, movimiento)
}
const updateFromRec = (req) => {
  const tipoHito = {
    idthit: req.body.tipoHito.idthit,
    desthi: req.body.tipoHito.desthi,
    anusan: req.body.tipoHito.anusan,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(tipoHito, movimiento)
}
const deleteFromRec = (req) => {
  const tipoHito = {
    idthit: req.body.tipoHito.idthit,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(tipoHito, movimiento)
}

export const tipo = async (req, res) => {
  const context = req.body.tipoHitoHito

  try {
    const result = await DAL.find(context)

    if (result.length === 1) {
      return res.status(200).json(result[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const tipos = async (req, res) => {
  const context = req.body.tipoHitoHito

  try {
    const result = await DAL.findAll(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}

export const crear = async (req, res) => {
  try {
    const result = await DAL.insert(insertFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const modificar = async (req, res) => {
  try {
    const result = await DAL.update(updateFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrar = async (req, res) => {
  try {
    const result = await DAL.remove(deleteFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
