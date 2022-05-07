import * as DAL from '../models/cita.model'

const insertFromRec = (req) => {
  const documento = {
    orgcit: req.body.documento.orgcit,
    oficit: req.body.documento.oficit,
    feccit: req.body.documento.feccit,
    horcit: req.body.documento.horcit,
    nifcon: req.body.documento.nifcon,
    nomcon: req.body.documento.nomcon,
    telcon: req.body.documento.telcon,
    descit: req.body.documento.descit,
    notcit: req.body.documento.notcit,
    obscit: req.body.documento.obscit,
    stacit: req.body.documento.stacit,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(documento, movimiento)
}
const updateFromRec = (req) => {
  const documento = {
    idcita: req.body.cita.idcita,
    obscit: req.body.cita.obscit,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(documento, movimiento)
}
const deleteFromRec = (req) => {
  const documento = {
    idcita: req.body.documento.idcita,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(documento, movimiento)
}
const cambioFromRec = (req) => {
  const documento = {
    idcita: req.body.documento.idcita,
    stacit: req.body.documento.stacit,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(documento, movimiento)
}
const asignarFromRec = (req) => {
  const cita = {
    idcita: req.body.cita.idcita,
    stacit: req.body.cita.stacit,
  }
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

  return Object.assign(cita, formulario, movimiento)
}

export const cita = async (req, res) => {
  const context = req.body.cita

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
export const citas = async (req, res) => {
  const context = req.body.cita

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
export const citaToFormulario = async (req, res) => {
  try {
    const result = await DAL.asignar(asignarFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
