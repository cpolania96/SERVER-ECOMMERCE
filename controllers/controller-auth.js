import User from "../models/User.js"


const controllerAuth = {}

controllerAuth.login = async (req, res) => {
    const { email, password } = req.body

}
controllerAuth.register = async (req, res) => {
    try {
        const { email } = req.body
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }
        user = new User(req.body)
        await user.save()
        res.status(201).json({
            ok: true,
            msg: 'Registro exitoso'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, contáctese con el administrador'
        })
    }
}
export default controllerAuth