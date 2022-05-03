import express from "express";
import {
  formulario,
  formularios,
  cambioEstado,
  estadisticas,
  crear,
  modificar,
  borrar,
  crearSms,
  formularioByRef,
} from "../controllers/formulario.controller";

const apiFormularioRouter = express.Router();

// formularios
apiFormularioRouter.post("/formulario", formulario);
apiFormularioRouter.post("/formularios", formularios);
apiFormularioRouter.post("/formularios/referencia", formularioByRef);
apiFormularioRouter.post("/formularios/insert", crear);
apiFormularioRouter.post("/formularios/update", modificar);
apiFormularioRouter.post("/formularios/delete", borrar);
apiFormularioRouter.post("/formularios/cambio", cambioEstado);
apiFormularioRouter.post("/formularios/stats", estadisticas);
apiFormularioRouter.post("/formularios/sms/insert", crearSms);

export default apiFormularioRouter;
