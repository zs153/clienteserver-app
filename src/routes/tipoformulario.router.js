import express from 'express'
import {
  formulario,
  formularios,
  crear,
  modificar,
  borrar,
} from '../controllers/tipoformulario.controller'

const apiTipoFormulario = express.Router()

// formularios
apiTipoFormulario.post('/tipos/formulario', formulario)
apiTipoFormulario.post('/tipos/formularios', formularios)
apiTipoFormulario.post('/tipos/formularios/insert', crear)
apiTipoFormulario.post('/tipos/formularios/update', modificar)
apiTipoFormulario.post('/tipos/formularios/delete', borrar)

export default apiTipoFormulario
