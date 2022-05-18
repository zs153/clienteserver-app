import express from "express";
import {
  tipo,
  tipos,
  crear,
  modificar,
  borrar,
} from "../controllers/tipofraude.controller";

const apiTipoFraude = express.Router();

// tipos
apiTipoFraude.post("/tipofraude", tipo);
apiTipoFraude.post("/tiposfraude", tipos);
apiTipoFraude.post("/tiposfraude/insert", crear);
apiTipoFraude.post("/tiposfraude/update", modificar);
apiTipoFraude.post("/tiposfraude/delete", borrar);

export default apiTipoFraude;
