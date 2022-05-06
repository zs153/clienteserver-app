import express from 'express'
import {
  subtipo,
  subtipos,
  crear,
  modificar,
  borrar,
} from '../controllers/subtipo.controller'

const apiSubtipoipoRouter = express.Router()

// subtipos
apiSubtipoipoRouter.post('/subtipo', subtipo)
apiSubtipoipoRouter.post('/subtipos', subtipos)
apiSubtipoipoRouter.post('/subtipos/insert', crear)
apiSubtipoipoRouter.post('/subtipos/update', modificar)
apiSubtipoipoRouter.post('/subtipos/delete', borrar)

export default apiSubtipoipoRouter
