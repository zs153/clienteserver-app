import express from "express";
import {
  borrar,
  cambioEstado,
  cita,
  citas,
  citaToFormulario,
  crear,
  modificar,
} from "../controllers/cita.controller";

const apiCitaRouter = express.Router();

// citas
apiCitaRouter.post("/cita", cita);
apiCitaRouter.post("/citas", citas);
apiCitaRouter.post("/citas/insert", crear);
apiCitaRouter.post("/citas/update", modificar);
apiCitaRouter.post("/citas/delete", borrar);
apiCitaRouter.post("/citas/cambio", cambioEstado);
apiCitaRouter.post("/citas/asignar", citaToFormulario);

export default apiCitaRouter;
