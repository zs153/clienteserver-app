import { find, findAll, insert, update, remove } from '../models/oficina.model'

const baseQuery = `
  SELECT 
    idofic,
    desofi,
    codofi
  FROM oficinas
`
const insertFromRec = (req) => {
  const oficina = {
    desofi: req.body.oficina.desofi,
    codofi: req.body.oficina.codofi,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(oficina, movimiento)
}
const updateFromRec = (req) => {
  const oficina = {
    idofic: req.body.oficina.idofic,
    desofi: req.body.oficina.desofi,
    codofi: req.body.oficina.codofi,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(oficina, movimiento)
}
const deleteFromRec = (req) => {
  const oficina = {
    idofic: req.body.oficina.idofic,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(oficina, movimiento)
}

export const getOficinas = async (req, res) => {
  try {
    const rows = await findAll()

    res.status(200).json(rows)
  } catch (err) {
    res.status(400).end()
  }
}
export const getOficina = async (req, res) => {
  try {
    const context = {}

    context.idofic = req.body.idofic

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

export const insertOficina = async (req, res) => {
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
export const updateOficina = async (req, res) => {
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
export const deleteOficina = async (req, res) => {
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
