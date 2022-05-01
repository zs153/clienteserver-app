import express from 'express'
import { getCita, getCitas, updateCita } from '../controllers/cita.controller'
import {
  deleteOficina,
  getOficina,
  getOficinas,
  insertOficina,
  updateOficina,
} from '../controllers/oficina.controller'
import {
  deleteSubtipo,
  getSubtipo,
  getSubtipos,
  getSubtiposTipo,
  getTiposSubtipos,
  insertSubtipo,
  updateSubtipo,
} from '../controllers/subtipo.controller'
import {
  deletetipo,
  gettipo,
  gettipos,
  inserttipo,
  updatetipo,
} from '../controllers/tipo.controller'
import {
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarios,
  getUsuario,
  registroUsuario,
  perfilUsuario,
  cambioUsuario,
  olvidoUsuario,
} from '../controllers/usuario.controller'

const apiRouter = express.Router()

// citas
apiRouter.post('/citas', getCitas)
apiRouter.post('/cita', getCita)
apiRouter.post('/citas/update', updateCita)

// usuarios
apiRouter.post('/usuarios', getUsuarios)
apiRouter.post('/usuario', getUsuario)
apiRouter.post('/usuarios/insert', insertUsuario)
apiRouter.post('/usuarios/update', updateUsuario)
apiRouter.post('/usuarios/delete', deleteUsuario)
apiRouter.post('/usuarios/registro', registroUsuario)
apiRouter.post('/usuarios/cambio', cambioUsuario)
apiRouter.post('/usuarios/forgot', olvidoUsuario)
apiRouter.post('/usuarios/perfil', perfilUsuario)
// oficinas
apiRouter.post('/oficinas', getOficinas)
apiRouter.post('/oficina', getOficina)
apiRouter.post('/oficinas/insert', insertOficina)
apiRouter.post('/oficinas/update', updateOficina)
apiRouter.post('/oficinas/delete', deleteOficina)
// tipos
apiRouter.post('/tipos', gettipos)
apiRouter.post('/tipo', gettipo)
apiRouter.post('/tipos/insert', inserttipo)
apiRouter.post('/tipos/update', updatetipo)
apiRouter.post('/tipos/delete', deletetipo)
// subtipos
apiRouter.post('/subtipos', getSubtipos)
apiRouter.post('/subtipo', getSubtipo)
apiRouter.post('/subtipostipo', getSubtiposTipo)
apiRouter.post('/tipossubtipos', getTiposSubtipos)
apiRouter.post('/subtipos/insert', insertSubtipo)
apiRouter.post('/subtipos/update', updateSubtipo)
apiRouter.post('/subtipos/delete', deleteSubtipo)

export default apiRouter
