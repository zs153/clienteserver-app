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
  cambioSituacion,
  eventosFraude,
  crearEvento,
} from '../controllers/fraude.controller'

const apiFraudeRouter = express.Router()

// fraudes
apiFraudeRouter.post('/fraude', fraude)
apiFraudeRouter.post('/fraudes', fraudes)
apiFraudeRouter.post('/fraudes/insert', crear)
apiFraudeRouter.post('/fraudes/update', modificar)
apiFraudeRouter.post('/fraudes/delete', borrar)
apiFraudeRouter.post('/fraudes/cambio', cambioEstado)
apiFraudeRouter.post('/fraudes/situacion', cambioSituacion)
apiFraudeRouter.post('/fraudes/stats', estadisticas)
apiFraudeRouter.post('/fraudes/sms/insert', crearSms)
//hitos
apiFraudeRouter.post('/fraudes/hitos', hitosFraude)
apiFraudeRouter.post('/fraudes/hitos/insert', crearHito)
//eventos
apiFraudeRouter.post('/fraudes/eventos', eventosFraude)
apiFraudeRouter.post('/fraudes/eventos/insert', crearEvento)

export default apiFraudeRouter
