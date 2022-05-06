import * as DAL from '../models/fraude.model'

const insertFromRec = (req) => {
  const fraude = {
    fecfra: req.body.fraude.fecfra,
    nifcon: req.body.fraude.nifcon,
    nomcon: req.body.fraude.nomcon,
    emacon: req.body.fraude.emacon,
    telcon: req.body.fraude.telcon,
    movcon: req.body.fraude.movcon,
    reffra: req.body.fraude.reffra,
    tipfra: req.body.fraude.tipfra,
    ejefra: req.body.fraude.ejefra,
    ofifra: req.body.fraude.ofifra,
    obsfra: req.body.fraude.obsfra,
    funfra: req.body.fraude.funfra,
    liqfra: req.body.fraude.liqfra,
    stafra: req.body.fraude.stafra,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, movimiento)
}
const updateFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
    fecfra: req.body.fraude.fecfra,
    nifcon: req.body.fraude.nifcon,
    nomcon: req.body.fraude.nomcon,
    emacon: req.body.fraude.emacon,
    telcon: req.body.fraude.telcon,
    movcon: req.body.fraude.movcon,
    tipfra: req.body.fraude.tipfra,
    ejefra: req.body.fraude.ejefra,
    ofifra: req.body.fraude.ofifra,
    obsfra: req.body.fraude.obsfra,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, movimiento)
}
const deleteFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, movimiento)
}
const cambioFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
    liqfra: req.body.fraude.liqfra,
    liqfra: req.body.fraude.liqfra,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, movimiento)
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
  const fraude = {
    idfrau: req.body.fraude.idfrau,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(sms, fraude, movimiento)
}
const insertHitoFromRec = (req) => {
  const fraude = {
    idfrau: req.body.fraude.idfrau,
  }
  const hito = {
    fechit: req.body.hito.fechit,
    tiphit: req.body.hito.tiphit,
    subthi: req.body.hito.subthi,
    imphit: req.body.hito.imphit,
    obshit: req.body.hito.obshit,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(fraude, hito, movimiento)
}
const updateHitoFromRec = (req) => {
  const hito = {
    idhito: req.body.hito.idhito,
    fechit: req.body.hito.fechit,
    tiphit: req.body.hito.tiphit,
    subthi: req.body.hito.subthi,
    imphit: req.body.hito.imphit,
    obshit: req.body.hito.obshit,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(hito, movimiento)
}
const deleteHitoFromRec = (req) => {
  const hito = {
    idhito: req.body.fraude.idhito,
  }
  const movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  }

  return Object.assign(hito, movimiento)
}

export const fraude = async (req, res) => {
  const context = req.body.fraude

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
export const fraudes = async (req, res) => {
  const context = req.body.fraude

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
export const hitosFraude = async (req, res) => {
  const context = req.body.fraude

  try {
    const result = await DAL.findHitosFraude(context)

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
// hitos
export const crearHito = async (req, res) => {
  try {
    const result = await DAL.insert(insertHitoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const modificarHito = async (req, res) => {
  try {
    const result = await DAL.update(updateHitoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
export const borrarHito = async (req, res) => {
  try {
    const result = await DAL.remove(deleteHitoFromRec(req))

    if (result !== null) {
      res.status(200).json(result)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).end()
  }
}
