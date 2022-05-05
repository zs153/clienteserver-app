import * as DAL from '../models/formulario.model'

const insertFromRec = (req) => {
  const documento = {
    fecdoc: req.body.documento.fecdoc,
    nifcon: req.body.documento.nifcon,
    nomcon: req.body.documento.nomcon,
    emacon: req.body.documento.emacon,
    telcon: req.body.documento.telcon,
    movcon: req.body.documento.movcon,
    refdoc: req.body.documento.refdoc,
    tipdoc: req.body.documento.tipdoc,
    ejedoc: req.body.documento.ejedoc,
    ofidoc: req.body.documento.ofidoc,
    obsdoc: req.body.documento.obsdoc,
    fundoc: req.body.documento.fundoc,
    liqdoc: req.body.documento.liqdoc,
    stadoc: req.body.documento.stadoc,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(documento, movimiento)
}
const updateFromRec = (req) => {
  const documento = {
    iddocu: req.body.documento.iddocu,
    fecdoc: req.body.documento.fecdoc,
    nifcon: req.body.documento.nifcon,
    nomcon: req.body.documento.nomcon,
    emacon: req.body.documento.emacon,
    telcon: req.body.documento.telcon,
    movcon: req.body.documento.movcon,
    tipdoc: req.body.documento.tipdoc,
    ejedoc: req.body.documento.ejedoc,
    ofidoc: req.body.documento.ofidoc,
    obsdoc: req.body.documento.obsdoc,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(documento, movimiento)
}
const deleteFromRec = (req) => {
  const documento = {
    iddocu: req.body.documento.iddocu,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(documento, movimiento)
}
const cambioFromRec = (req) => {
  const documento = {
    iddocu: req.body.documento.iddocu,
    liqdoc: req.body.documento.liqdoc,
    stadoc: req.body.documento.stadoc,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(documento, movimiento)
}
const estadisticaFromRec = (req) => {
  const periodo = {
    desfec: req.body.periodo.desde,
    hasfec: req.body.periodo.hasta,
  }

  return Object.assign({}, periodo)
}
const smsFromRec = (req) => {
  const sms = {
    texsms: req.body.sms.texsms,
    movsms: req.body.sms.movsms,
    stasms: req.body.sms.stasms,
  }
  const documento = {
    iddocu: req.body.documento.iddocu,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(sms, documento, movimiento)
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

    if (rows !== null) {
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
