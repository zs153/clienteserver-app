import express from 'express'
import {
  formulario,
  formularios,
  cambioEstado,
  estadisticas,
  add,
  mod,
  del,
  addSms,
} from '../controllers/formulario.controller'

const apiFormularioRouter = express.Router()

// formularios
apiFormularioRouter.post('/formularios', formularios)
apiFormularioRouter.post('/formulario', formulario)
apiFormularioRouter.post('/formularios/insert', add)
apiFormularioRouter.post('/formularios/update', mod)
apiFormularioRouter.post('/formularios/delete', del)
apiFormularioRouter.post('/formularios/cambio', cambioEstado)
apiFormularioRouter.post('/formularios/stats', estadisticas)
apiFormularioRouter.post('/formularios/sms/insert', addSms)

export default apiFormularioRouter
