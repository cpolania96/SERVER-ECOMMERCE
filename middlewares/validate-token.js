// Importaciones
import { response, request } from "express"
import jwt from "jsonwebtoken"
import { config } from "dotenv"

// Inicio del middleware de validación de token
const validateToken = async (req = request, res = response, next) => {
    // Obtencion del token
    let token = req.header('x-token')
    let { SECRET_JWT_SEED } = config().parsed
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se recibió un token'
        })
    }
    try {
        // Desestructuración del token
        const payload = jwt.verify(token, SECRET_JWT_SEED)
        const { uid, name } = payload
        req.uid = uid
        req.name = name
    } catch (error) {
        // Manejo de errores
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
    // Siguiente
    next()
}

// Exportaciones
export default validateToken