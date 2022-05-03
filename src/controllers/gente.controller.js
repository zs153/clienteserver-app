import * as Gente from "../models/gente.model";

export const getGente = async (req, res) => {
  const context = {};
  context.nifgen = req.body.nifgen;

  if (context.nifgen.length > 9) {
    context.disgen = nif.slice(-1);
  }

  try {
    const rows = await Gente.find(context);

    if (rows.length === 1) {
      return res.status(200).json(rows[0]);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
};
