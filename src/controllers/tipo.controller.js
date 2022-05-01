import { find, findAll, insert, update, remove } from '../models/tipo.model'

const insertFromRec = (req) => {
  const tipo = {
    destip: req.body.tipo.destip,
    ayutip: req.body.tipo.ayutip,
    orgtip: req.body.tipo.orgtip,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(tipo, movimiento)
}
const updateFromRec = (req) => {
  const tipo = {
    idtipo: req.body.tipo.idtipo,
    destip: req.body.tipo.destip,
    ayutip: req.body.tipo.ayutip,
    orgtip: req.body.tipo.orgtip,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(tipo, movimiento)
}
const deleteFromRec = (req) => {
  const tipo = {
    idtipo: req.body.tipo.idtipo,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(tipo, movimiento)
}

export const gettipos = async (req, res) => {
  try {
    const rows = await findAll()

    res.status(200).json(rows)
  } catch (err) {
    res.status(400).end()
  }
}
export const gettipo = async (req, res) => {
  try {
    const context = {}

    context.idtipo = req.body.idtipo

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

export const inserttipo = async (req, res) => {
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
export const updatetipo = async (req, res) => {
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
export const deletetipo = async (req, res) => {
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
