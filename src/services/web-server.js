import http from 'http'
import logger from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import cors from 'cors'
import { port } from '../config/settings'
import apiRouter from '../routes/api.router'
import apiFormularioRouter from '../routes/formulario.router'
import apiSmsRouter from '../routes/sms.router'
import apiGenteRouter from '../routes/gente.router'
import apiCitaRouter from '../routes/cita.router'
import apiUsuarioRouter from '../routes/usuario.router'
import apiFraudeRouter from '../routes/fraude.router'
import apiTipoHitoRouter from '../routes/tipohito.router'
import apiTipoEventoRouter from '../routes/tipoevento.router'
import apiSubtipoRouter from '../routes/subtipo.router'
import apiHitoRouter from '../routes/hito.router'
import apiEventoRouter from '../routes/evento.router'

let httpServer

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express()
    httpServer = http.createServer(app)

    // middleware
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(cors())
    app.use(express.static(path.join(__dirname, '/public')))

    // routes
    app.use('/api', apiRouter)
    app.use('/api', apiFormularioRouter)
    app.use('/api', apiSmsRouter)
    app.use('/api', apiGenteRouter)
    app.use('/api', apiCitaRouter)
    app.use('/api', apiUsuarioRouter)
    app.use('/api', apiFraudeRouter)
    app.use('/api', apiTipoHitoRouter)
    app.use('/api', apiTipoEventoRouter)
    app.use('/api', apiSubtipoRouter)
    app.use('/api', apiHitoRouter)
    app.use('/api', apiEventoRouter)

    // server
    httpServer
      .listen(port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${port}`)

        resolve()
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}

module.exports.initialize = initialize

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}

module.exports.close = close

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/

function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value)
  } else {
    return value
  }
}