import { find, insert, update, remove } from "../models/oficina.model";

const getOficinaFromRec = (req) => {
  const Oficina = {
    idofic: req.body.idusua,
    desofi: req.body.nomusu,
    codofi: req.body.ofiusu,
  };

  return Oficina;
};
export const getOficinas = async (req, res) => {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);

    const rows = await find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    res.status(500).end();
  }
};

export const insertOficina = async (req, res) => {
  try {
    let oficina = getOficinaFromRec(req);
    oficina.movimiento = {
      usumov: req.body.movimiento.usuarioMov,
      tipmov: req.body.movimiento.tipoMov,
    };
    oficina = await insert(oficina);

    res.status(201).json(oficina);
  } catch (err) {
    res.status(500).end();
  }
};
export const updateOficina = async (req, res) => {
  try {
    let oficina = getOficinaFromRec(req);
    oficina.movimiento = {
      usumov: req.body.movimiento.usuarioMov,
      tipmov: req.body.movimiento.tipoMov,
    };
    oficina = await update(oficina);

    if (oficina !== null) {
      res.status(200).json(oficina);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
export const deleteOficina = async (req, res) => {
  try {
    let oficina = getOficinaFromRec(req);
    oficina.movimiento = {
      usumov: req.body.movimiento.oficinaMov,
      tipmov: req.body.movimiento.tipoMov,
    };
    const success = await remove(oficina);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
