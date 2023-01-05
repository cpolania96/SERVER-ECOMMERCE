import express, { Router } from "express";
import { check } from "express-validator"
import validateFields from "../middlewares/validate-fields.js";
const auth = Router()

auth.use(express.json())
auth.use(express.urlencoded({ extended: true }))

auth.post('/login',
    [
        // check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorio').isLength({min: 5}),
        validateFields
    ]
    , async (req, res) => {
        console.log(req.body);
    })


export default auth