import express from "express";
import {
  subtipo,
  subtipos,
  crear,
  modificar,
  borrar,
  subtiposTipo,
} from "../controllers/subtipo.controller";

const apiSubtipoRouter = express.Router();

// subtipos
apiSubtipoRouter.post("/subtipo", subtipo);
apiSubtipoRouter.post("/subtipos", subtipos);
apiSubtipoRouter.post("/subtipos/tipo", subtiposTipo);
apiSubtipoRouter.post("/subtipos/insert", crear);
apiSubtipoRouter.post("/subtipos/update", modificar);
apiSubtipoRouter.post("/subtipos/delete", borrar);

export default apiSubtipoRouter;
