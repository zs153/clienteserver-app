import express from 'express'
import {
  formulario,
  formularios,
  cambioEstado,
  estadisticas,
  crear,
  modificar,
  borrar,
  crearSms,
  estadisticasFormularios,
  estadisticasOficinas,
} from '../controllers/formulario.controller'

const apiFormularioRouter = express.Router()

// formularios
apiFormularioRouter.post('/formulario', formulario)
apiFormularioRouter.post('/formularios', formularios)
apiFormularioRouter.post('/formularios/insert', crear)
apiFormularioRouter.post('/formularios/update', modificar)
apiFormularioRouter.post('/formularios/delete', borrar)
apiFormularioRouter.post('/formularios/cambio', cambioEstado)
apiFormularioRouter.post('/formularios/stats', estadisticas)
apiFormularioRouter.post('/formularios/sms/insert', crearSms)
apiFormularioRouter.post('/fraudes/stat/formularios', estadisticasFormularios)
apiFormularioRouter.post('/fraudes/stat/oficinas', estadisticasOficinas)

export default apiFormularioRouter
