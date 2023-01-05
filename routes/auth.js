import express, { Router } from "express";
import { check } from "express-validator"
import validateFields from "../middlewares/validate-fields.js";
import controllerAuth from "../controllers/controller-auth.js";

const auth = Router()

auth.use(express.json())
auth.use(express.urlencoded({ extended: true }))

auth.post('/login',
    [
        // check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorio').isLength({ min: 5 }),
        validateFields
    ]
    , controllerAuth.login
)
auth.post('/register', [
    // check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').isLength({ min: 5 }),
    validateFields
]
    , controllerAuth.register)


export default auth