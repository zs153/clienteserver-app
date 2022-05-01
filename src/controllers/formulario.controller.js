import {
  find,
  findAll,
  findByLiq,
  findByRef,
  insert,
  update,
  remove,
  change,
  stats,
  insertSms,
} from '../models/formulario.model'

const insertFromRec = (req) => {
  const formulario = {
    fecdoc: req.body.fecdoc,
    nifcon: req.body.nifcon,
    nomcon: req.body.nomcon,
    emacon: req.body.emacon,
    telcon: req.body.telcon,
    movcon: req.body.movcon,
    refdoc: req.body.refdoc,
    tipdoc: req.body.tipdoc,
    ejedoc: req.body.ejedoc,
    ofidoc: req.body.ofidoc,
    obsdoc: req.body.obsdoc,
    fundoc: req.body.fundoc,
    liqdoc: req.body.liqdoc,
    stadoc: req.body.stadoc,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(formulario, movimiento)
}
const updateFromRec = (req) => {
  const formulario = {
    iddocu: req.body.iddocu,
    fecdoc: req.body.fecdoc,
    nifcon: req.body.nifcon,
    nomcon: req.body.nomcon,
    emacon: req.body.emacon,
    telcon: req.body.telcon,
    movcon: req.body.movcon,
    refdoc: req.body.refdoc,
    tipdoc: req.body.tipdoc,
    ejedoc: req.body.ejedoc,
    ofidoc: req.body.ofidoc,
    obsdoc: req.body.obsdoc,
    fundoc: req.body.fundoc,
    liqdoc: req.body.liqdoc,
    stadoc: req.body.stadoc,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(formulario, movimiento)
}
const deleteFromRec = (req) => {
  const formulario = {
    iddocu: req.body.documento.iddocu,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(formulario, movimiento)
}
const cambioFromRec = (req) => {
  const formulario = {
    iddocu: req.body.documento.iddocu,
    liqdoc: req.body.documento.liqdoc,
    stadoc: req.body.documento.stadoc,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(formulario, movimiento)
}
const estadisticaFromRec = (req) => {
  const periodo = {
    desfec: req.body.periodo.desde,
    hasfec: req.body.periodo.hasta,
  }

  return Object.assign({}, periodo)
}
const smsFromRec = (req) => {
  const formulario = {
    iddocu: req.body.sms.iddocu,
  }
  const sms = {
    texsms: req.body.sms.texsms,
    movsms: req.body.sms.movsms,
    stasms: req.body.sms.stasms,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(sms, formulario, movimiento)
}

export const formulario = async (req, res) => {
  try {
    const context = {}
    context.iddocu = req.body.iddocu

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
export const formularios = async (req, res) => {
  try {
    const context = {}
    context.stadoc = req.body.formulario.stadoc

    const rows = await findAll(context)

    res.status(200).json(rows)
  } catch (err) {
    res.status(400).end()
  }
}
export const formularioByRef = async (req, res) => {
  try {
    const context = {}
    context.refdoc = req.body.formulario.refdoc

    const rows = await findByRef(context)

    if (rows.length === 1) {
      res.status(200).json(rows[0])
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const formularioByLiquidador = async (req, res) => {
  try {
    const context = {}
    context.liqdoc = req.body.formulario.liqdoc

    const rows = await findByLiq(context)

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
export const estadisticas = async (req, res) => {
  try {
    const result = await stats(estadisticaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const addSms = async (req, res) => {
  try {
    const result = await insertSms(smsFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(403).end()
  }
}
