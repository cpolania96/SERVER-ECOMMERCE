// Importaciones
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

// Generador de Tokens
const generateJWT = (uid, name) => {
    const {SECRET_JWT_SEED} = config().parsed
    // Return de promesa
    return new Promise((resolve, reject) => {
        const payload = { uid, name }
        jwt.sign(payload, SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err) {
                console.log(`Error en: ${err}`)
                reject('No se pudo generar el token')
            }
            resolve(token)
        })
    })
}

export default generateJWT