import express from 'express'
import {
  add,
  cambioEstado,
  del,
  mod,
  sms,
  smss,
} from '../controllers/sms.controller'

const apiSmsRouter = express.Router()

// smss
apiSmsRouter.post('/smss', smss)
apiSmsRouter.post('/sms', sms)
apiSmsRouter.post('/smss/insert', add)
apiSmsRouter.post('/smss/update', mod)
apiSmsRouter.post('/smss/delete', del)
apiSmsRouter.post('/smss/cambio', cambioEstado)

export default apiSmsRouter
