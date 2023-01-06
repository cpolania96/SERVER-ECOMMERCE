// Importaciones
import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import generateJWT from "../helpers/jwt.js"

// Objeto donde se guardan los controladores
const controllerAuth = {}

// Módulo de login
controllerAuth.login = async (req, res) => {
    try {
        // Validación de existencia de usuario
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }
        // Validación de contraseña
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas'
            })
        }
        // Generación de JWT
        const token = await generateJWT(user._id, user.name)

        // Envio de respuesta a cliente
        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contáctese con el administrador'
        })
    }
}

// Módulo de registro
controllerAuth.register = async (req, res) => {
    try {
        // Validación de existencia de usuario
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }
        user = new User(req.body)
        // Encriptación de contraseña
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
        // Generación de JWT
        const token = await generateJWT(user._id, user.name)
        // Guardado de datos de usuario
        await user.save()
        res.status(201).json({
            ok: true,
            uid: user._id,
            token
        })
    } catch (error) {
        // Manejo de errores
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contáctese con el administrador'
        })
    }
}

// Módulo de revalidación de token
controllerAuth.renew = async (req, res) => {
    const {uid, name} = req
    let token = await generateJWT(uid, name)
    res.json({
        ok: true,
        token
    })
}

// Exportación
export default controllerAuth