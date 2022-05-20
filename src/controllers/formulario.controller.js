import * as DAL from '../models/formulario.model'

const insertFromRec = (req) => {
  const formulario = {
    fecdoc: req.body.formulario.fecdoc,
    nifcon: req.body.formulario.nifcon,
    nomcon: req.body.formulario.nomcon,
    emacon: req.body.formulario.emacon,
    telcon: req.body.formulario.telcon,
    movcon: req.body.formulario.movcon,
    refdoc: req.body.formulario.refdoc,
    tipdoc: req.body.formulario.tipdoc,
    ejedoc: req.body.formulario.ejedoc,
    ofidoc: req.body.formulario.ofidoc,
    obsdoc: req.body.formulario.obsdoc,
    fundoc: req.body.formulario.fundoc,
    liqdoc: req.body.formulario.liqdoc,
    stadoc: req.body.formulario.stadoc,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(formulario, movimiento)
}
const updateFromRec = (req) => {
  const formulario = {
    iddocu: req.body.formulario.iddocu,
    fecdoc: req.body.formulario.fecdoc,
    nifcon: req.body.formulario.nifcon,
    nomcon: req.body.formulario.nomcon,
    emacon: req.body.formulario.emacon,
    telcon: req.body.formulario.telcon,
    movcon: req.body.formulario.movcon,
    tipdoc: req.body.formulario.tipdoc,
    ejedoc: req.body.formulario.ejedoc,
    ofidoc: req.body.formulario.ofidoc,
    obsdoc: req.body.formulario.obsdoc,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(formulario, movimiento)
}
const deleteFromRec = (req) => {
  const formulario = {
    iddocu: req.body.formulario.iddocu,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(formulario, movimiento)
}
const cambioFromRec = (req) => {
  const formulario = {
    iddocu: req.body.formulario.iddocu,
    liqdoc: req.body.formulario.liqdoc,
    stadoc: req.body.formulario.stadoc,
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
    iddocu: req.body.formulario.iddocu,
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
  const context = req.body.formulario

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
export const formularios = async (req, res) => {
  const context = req.body.formulario

  try {
    const result = await DAL.findAll(context)

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(400).end()
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
export const cambioEstado = async (req, res) => {
  try {
    const result = await DAL.change(cambioFromRec(req))

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
    const result = await DAL.stats(estadisticaFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const crearSms = async (req, res) => {
  try {
    const result = await DAL.insertSms(smsFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(403).end()
  }
}
