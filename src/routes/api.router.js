import express from "express";
import { getCita, getCitas, updateCita } from "../controllers/cita.controller";
import {
  getFormulario,
  getFormularios,
} from "../controllers/formulario.controller";
import {
  deleteOficina,
  getOficina,
  getOficinas,
  insertOficina,
  updateOficina,
} from "../controllers/oficina.controller";
import {
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarios,
  getUsuario,
  registroUsuario,
  cambioPasswordUsuario,
  olvidoPasswordUsuario,
  perfilUsuario,
} from "../controllers/usuario.controller";

const apiRouter = express.Router();

// citas
apiRouter.post("/citas", getCitas);
apiRouter.post("/cita", getCita);
apiRouter.post("/citas/update", updateCita);
// formularios
apiRouter.post("/formularios", getFormularios);
apiRouter.post("/formulario", getFormulario);
// usuarios
apiRouter.post("/usuarios", getUsuarios);
apiRouter.post("/usuario", getUsuario);
apiRouter.post("/usuarios/insert", insertUsuario);
apiRouter.post("/usuarios/update", updateUsuario);
apiRouter.post("/usuarios/delete", deleteUsuario);
apiRouter.post("/usuarios/registro", registroUsuario);
apiRouter.post("/usuarios/cambio", cambioPasswordUsuario);
apiRouter.post("/usuarios/forgot", olvidoPasswordUsuario);
apiRouter.post("/usuarios/perfil", perfilUsuario);
// oficinas
apiRouter.post("/oficinas", getOficinas);
apiRouter.post("/oficina", getOficina);
apiRouter.post("/oficinas/insert", insertOficina);
apiRouter.post("/oficinas/update", updateOficina);
apiRouter.post("/oficinas/delete", deleteOficina);

export default apiRouter;
