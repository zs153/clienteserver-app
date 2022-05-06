import express from "express";
import {
  hito,
  hitos,
  crear,
  modificar,
  borrar,
} from "../controllers/hito.controller";

const apiHitoRouter = express.Router();

// hitos
apiHitoRouter.post("/hito", hito);
apiHitoRouter.post("/hitos", hitos);
apiHitoRouter.post("/hitos/insert", crear);
apiHitoRouter.post("/hitos/update", modificar);
apiHitoRouter.post("/hitos/delete", borrar);

export default apiHitoRouter;
