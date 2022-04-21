import express from 'express'
import { getFormularios } from '../controllers/formulario.controller'
import {
  deleteOficina,
  getOficinas,
  insertOficina,
  updateOficina,
} from '../controllers/oficina.controller'
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
} from '../controllers/usuario.controller'

const apiRouter = express.Router()

// formularios
apiRouter.post('/formularios', getFormularios)
// usuarios
apiRouter.get('/usuarios/:id?', getUsuarios)
apiRouter.post('/usuario', getUsuario)
apiRouter.post('/usuarios/insert', insertUsuario)
apiRouter.post('/usuarios/update', updateUsuario)
apiRouter.post('/usuarios/delete', deleteUsuario)
apiRouter.post('/usuarios/registro', registroUsuario)
apiRouter.post('/usuarios/cambio', cambioPasswordUsuario)
apiRouter.post('/usuarios/forgot', olvidoPasswordUsuario)
apiRouter.post('/usuarios/perfil', perfilUsuario)
// oficinas
apiRouter.get('/oficinas/:id?', getOficinas)
apiRouter.post('/oficinas/insert', insertOficina)
apiRouter.post('/oficinas/update', updateOficina)
apiRouter.post('/oficinas/delete', deleteOficina)

export default apiRouter
