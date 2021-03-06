import express from 'express'
import {
  mainPage,
  errorPage,
  perfilPage,
  changePassword,
  updatePerfil,
} from '../controllers/admin.controller'
import authRoutes from '../middleware/auth'

const adminRouter = express.Router()

// paginas
adminRouter.get('/', authRoutes, mainPage)
adminRouter.get('/perfil/:userid', authRoutes, perfilPage)

// procedures
adminRouter.post('/cambio', authRoutes, changePassword)
adminRouter.post('/perfil', authRoutes, updatePerfil)

// error
adminRouter.post('/error400', errorPage)

export default adminRouter
