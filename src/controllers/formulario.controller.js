import {
  find,
  findByRef,
  insert,
  update,
  remove,
  cambio,
  estadistica,
} from '../models/formulario.model'

export const getFormularios = async (req, res) => {
  try {
    const context = {}

    context.id = parseInt(req.params.id, 10)
    context.stat = parseInt(req.params.stat, 10)
    console.log(context)
    // const rows = await find(context)

    // if (req.params.id) {
    //   if (rows.length === 1) {
    //     res.status(200).json(rows[0])
    //   } else {
    //     res.status(404).end()
    //   }
    // } else {
    //   res.status(200).json(rows)
    // }
  } catch (err) {
    res.status(400).end()
  }
}
export const getFormularioByRef = async (req, res) => {
  try {
    const context = {}

    context.ref = req.body.refdoc

    const rows = await findByRef(context)

    if (context.refdoc) {
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
const insertFromRec = (req) => {
  let doc = {
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
  doc.movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return doc
}
export const insertFormulario = async (req, res) => {
  try {
    let documento = insertFromRec(req)
    documento = await insert(documento)

    res.status(200).json(documento)
  } catch (err) {
    res.status(500).end()
  }
}
const updateFromRec = (req) => {
  let doc = {
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
  doc.movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return doc
}
export const updateFormulario = async (req, res) => {
  try {
    let documento = updateFromRec(req)
    documento = await update(documento)

    if (documento !== null) {
      res.status(200).json(documento)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
const deleteFromRec = (req) => {
  let doc = {
    iddocu: req.body.documento.iddocu,
  }
  doc.movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return doc
}
export const deleteFormulario = async (req, res) => {
  try {
    const documento = deleteFromRec(req)
    const success = await remove(documento)

    if (success) {
      res.status(200).end()
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
const cambioFromRec = (req) => {
  let doc = {
    iddocu: req.body.documento.iddocu,
    liqdoc: req.body.documento.liqdoc,
    stadoc: req.body.documento.stadoc,
  }
  doc.movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return doc
}
export const cambioEstado = async (req, res) => {
  try {
    const documento = cambioFromRec(req)

    await cambioEstado(documento)
    res.status(200).end()
  } catch (err) {
    res.status(403).end()
  }
}
const estadisticaFromRec = (req) => {
  let doc = {
    desfec: req.body.periodo.desde,
    hasfec: req.body.periodo.hasta,
  }

  return doc
}
export const estadisticaFormularios = async (req, res) => {
  try {
    const documento = estadisticaFromRec(req)

    const result = await estadistica(documento)
    res.status(200).json(result)
  } catch (err) {
    res.status(403).end()
  }
}
const smsFromRec = (req) => {
  let doc = {
    iddocu: req.body.periodo.iddocu,
  }
  doc.sms = {
    texsms: req.body.periodo.texsms,
    movsms: req.body.periodo.movsms,
    stasms: req.body.periodo.stasms,
  }
  doc.movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return doc
}
export const smsFormularios = async (req, res) => {
  try {
    let documento = smsFromRec(req)
    documento = await sms(documento)

    res.status(200).json(documento)
  } catch (err) {
    res.status(403).end()
  }
}
