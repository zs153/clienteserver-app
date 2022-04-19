import Usuario from '../models/usuario.model'
import { tiposMovimiento } from '../public/js/enumeraciones'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret } from '../settings'

export const verifyLogin = async (req, res) => {
  const { userid, password } = req.body.user

  try {
    let usuario = new Usuario()
    usuario.userID = userid

    const result = await usuario.getUsuarioByUserID()
    if (!(usuario.userID === userid)) {
      res.status(404).json('Usuario no encontrado')
    } else {
      bcrypt.compare(password, usuario.password, (err, result) => {
        if (err) {
          res.status(405).json('La contraseña no es correcta')
        }

        if (result) {
          const accessToken = jwt.sign(
            {
              id: usuario.id,
              userID: usuario.userid,
              nombre: usuario.nombre,
              email: usuario.email,
              rol: usuario.rol,
              oficina: usuario.oficina,
            },
            secret,
            { expiresIn: '2h' }
          )

          const { pasusu, ...resto } = usuario
          res
            .header('authorization', accessToken)
            .status(200)
            .json({ ...resto, accessToken })
        }
      })
    }
  } catch (error) {
    res.status(500).json('No se ha podido conectar con el servidor')
  }
}
export const verifyLogout = async (req, res) => {
  const options = {
    path: '/',
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  }

  res.clearCookie('x-access_token')
  res.cookie('auth', undefined, options)

  res.status(200).json('Ha finalizado la sesión')
}
export const forgotPassword = async (req, res) => {
  const { email } = req.body.user
  const randomString = Math.random().toString().slice(2, 6)

  try {
    const usuario = new Usuario()

    usuario.emausu = email
    const { err, dat } = await usuario.getUsuarioByEmail()

    if (err) {
      res.status(406).json('No existe el usuario')
    } else {
      const password = usuario.userid + randomString

      const salt = await bcrypt.genSalt(10)
      const passHash = await bcrypt.hash(password, salt)

      usuario.password = passHash
      usuario.movimiento.tipo = tiposMovimiento.olvidoPassword
      usuario.salt = randomString

      const { err, dat } = await usuario.forgotPassword()

      if (err) {
        res.status(401).json('No se ha podido generar nueva contraseña')
      } else {
        res.status(200).json('Se ha generado una nueva contraseña')
      }
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
