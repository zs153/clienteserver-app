import { find, insert, update, remove, findById } from "../models/cita.model";

export const getCita = async (req, res) => {
  try {
    const context = {};
    context.idcita = req.body.idcita;

    const rows = await findById(context);

    res.status(200).json(rows);
  } catch (err) {
    res.status(400).end();
  }
};
export const getCitas = async (req, res) => {
  try {
    const context = {};
    context.stacit = req.body.cita.stacit;
    context.oficit = req.body.cita.oficit;

    const rows = await find(context);

    res.status(200).json(rows);
  } catch (err) {
    res.status(400).end();
  }
};
const insertFromRec = (req) => {
  let doc = {
    orgcit: req.body.cita.orgcit,
    oficit: req.body.cita.oficit,
    feccit: req.body.cita.feccit,
    horcit: req.body.cita.horcit,
    nifcon: req.body.cita.nifcon,
    nomcon: req.body.cita.nomcon,
    telcon: req.body.cita.telcon,
    descit: req.body.cita.descit,
    notcit: req.body.cita.notcit,
    obscit: req.body.cita.obscit,
    stacit: req.body.cita.stacit,
  };
  doc.movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  };

  return doc;
};
export const insertCita = async (req, res) => {
  try {
    let cita = insertFromRec(req);
    cita = await insert(cita);

    res.status(200).json(cita);
  } catch (err) {
    res.status(500).end();
  }
};
const updateFromRec = (req) => {
  let doc = {
    idcita: req.body.cita.idcita,
    obscit: req.body.cita.obscit,
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  };

  return doc;
};
export const updateCita = async (req, res) => {
  try {
    let cita = updateFromRec(req);

    cita = await update(cita);

    if (cita !== null) {
      res.status(200).json(cita);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
const deleteFromRec = (req) => {
  let doc = {
    idcita: req.body.cita.idcita,
  };
  doc.movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  };

  return doc;
};
export const deleteCita = async (req, res) => {
  try {
    const cita = deleteFromRec(req);
    const success = await remove(cita);

    if (success) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
const cambioFromRec = (req) => {
  let doc = {
    idcita: req.body.documento.idcita,
    liqdoc: req.body.documento.liqdoc,
    stadoc: req.body.documento.stadoc,
  };
  doc.movimiento = {
    usumov: req.body.movimiento.usumov,
    tipmov: req.body.movimiento.tipmov,
  };

  return doc;
};
export const cambioEstado = async (req, res) => {
  try {
    const documento = cambioFromRec(req);

    await cambioEstado(documento);
    res.status(200).end();
  } catch (err) {
    res.status(403).end();
  }
};
