import express from 'express'
import {
  tipo,
  tipos,
  crear,
  modificar,
  borrar,
} from '../controllers/tipoevento.controller'

const apiTipoRouter = express.Router()

// tipos
apiTipoRouter.post('/evento', tipo)
apiTipoRouter.post('/eventos', tipos)
apiTipoRouter.post('/eventos/insert', crear)
apiTipoRouter.post('/eventos/update', modificar)
apiTipoRouter.post('/eventos/delete', borrar)

export default apiTipoRouter
