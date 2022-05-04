import express from "express";
import {
  deleteOficina,
  getOficina,
  getOficinas,
  insertOficina,
  updateOficina,
} from "../controllers/oficina.controller";
import {
  deleteSubtipo,
  getSubtipo,
  getSubtipos,
  getSubtiposTipo,
  getTiposSubtipos,
  insertSubtipo,
  updateSubtipo,
} from "../controllers/subtipo.controller";
import {
  deletetipo,
  gettipo,
  gettipos,
  inserttipo,
  updatetipo,
} from "../controllers/tipo.controller";

const apiRouter = express.Router();

// oficinas
apiRouter.post("/oficinas", getOficinas);
apiRouter.post("/oficina", getOficina);
apiRouter.post("/oficinas/insert", insertOficina);
apiRouter.post("/oficinas/update", updateOficina);
apiRouter.post("/oficinas/delete", deleteOficina);
// tipos
apiRouter.post("/tipos", gettipos);
apiRouter.post("/tipo", gettipo);
apiRouter.post("/tipos/insert", inserttipo);
apiRouter.post("/tipos/update", updatetipo);
apiRouter.post("/tipos/delete", deletetipo);
// subtipos
apiRouter.post("/subtipos", getSubtipos);
apiRouter.post("/subtipo", getSubtipo);
apiRouter.post("/subtipostipo", getSubtiposTipo);
apiRouter.post("/tipossubtipos", getTiposSubtipos);
apiRouter.post("/subtipos/insert", insertSubtipo);
apiRouter.post("/subtipos/update", updateSubtipo);
apiRouter.post("/subtipos/delete", deleteSubtipo);

export default apiRouter;
