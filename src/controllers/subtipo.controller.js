import {
  find,
  findAll,
  findTiposSubtipos,
  findSubtiposTipo,
  insert,
  update,
  remove,
} from '../models/subtipo.model'

const insertFromRec = (req) => {
  const subtipo = {
    dessub: req.body.subtipo.dessub,
    idtipo: req.body.subtipo.idtipo,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(subtipo, movimiento)
}
const updateFromRec = (req) => {
  const subtipo = {
    idsubt: req.body.subtipo.idsubt,
    dessub: req.body.subtipo.dessub,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(subtipo, movimiento)
}
const deleteFromRec = (req) => {
  const subtipo = {
    idsubt: req.body.subtipo.idsubt,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(subtipo, movimiento)
}

export const getSubtipo = async (req, res) => {
  try {
    const context = {}
    context.idsubt = req.body.idsubt

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
export const getSubtipos = async (req, res) => {
  try {
    const rows = await findAll()

    res.status(200).json(rows)
  } catch (err) {
    res.status(400).end()
  }
}
export const getTiposSubtipos = async (req, res) => {
  try {
    const rows = await findTiposSubtipos()

    return res.status(200).json(rows)
  } catch (err) {
    res.status(500).end()
  }
}
export const getSubtiposTipo = async (req, res) => {
  try {
    const context = {}
    context.idtipo = req.body.idtipo

    const rows = await findSubtiposTipo(context)

    return res.status(200).json(rows)
  } catch (err) {
    res.status(500).end()
  }
}

export const insertSubtipo = async (req, res) => {
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
export const updateSubtipo = async (req, res) => {
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
export const deleteSubtipo = async (req, res) => {
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
