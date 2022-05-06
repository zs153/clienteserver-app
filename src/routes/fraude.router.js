import express from 'express'
import {
  fraude,
  fraudes,
  cambioEstado,
  estadisticas,
  crear,
  modificar,
  borrar,
  crearSms,
  hitosFraude,
  crearHito,
  modificarHito,
  borrarHito,
} from '../controllers/fraude.controller'

const apiFraudeRouter = express.Router()

// fraudes
apiFraudeRouter.post('/fraude', fraude)
apiFraudeRouter.post('/fraudes', fraudes)
apiFraudeRouter.post('/fraudes/insert', crear)
apiFraudeRouter.post('/fraudes/update', modificar)
apiFraudeRouter.post('/fraudes/delete', borrar)
apiFraudeRouter.post('/fraudes/cambio', cambioEstado)
apiFraudeRouter.post('/fraudes/stats', estadisticas)
apiFraudeRouter.post('/fraudes/sms/insert', crearSms)
//hitos
apiFraudeRouter.post('/fraudes/hitos', hitosFraude)
apiFraudeRouter.post('/fraudes/hitos/insert', crearHito)
apiFraudeRouter.post('/fraudes/hitos/update', modificarHito)
apiFraudeRouter.post('/fraudes/hitos/delete', borrarHito)

export default apiFraudeRouter
