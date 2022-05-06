import express from 'express'
import {
  deleteOficina,
  getOficina,
  getOficinas,
  insertOficina,
  updateOficina,
} from '../controllers/oficina.controller'

const apiRouter = express.Router()

// oficinas
apiRouter.post('/oficinas', getOficinas)
apiRouter.post('/oficina', getOficina)
apiRouter.post('/oficinas/insert', insertOficina)
apiRouter.post('/oficinas/update', updateOficina)
apiRouter.post('/oficinas/delete', deleteOficina)

export default apiRouter
