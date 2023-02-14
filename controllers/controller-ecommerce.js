import { request, response } from "express"
import Carousel from "../models/Carousel.js"
// import Carousel from "../models/Carousel"
const controllerEcommerce = {}

// Controlador para el carousell de la tienda

// Obtener todos los recursos
controllerEcommerce.carouselGetSources = async (req = request, res = response) => {
    try {
        let carouselItems = await Carousel.find()
        if (carouselItems) {
            res.status(200).json({
                ok: true,
                msg: 'Imagenes obtenidas con exito',
                src: carouselItems
            })
        }
        else {
            res.status(404).json({
                ok: false,
                msg: 'No se encontraron imagenes'
            })
        }
    } catch (error) {
        if (error) {
            res.status(400).json({
                ok: false,
                msg: 'Hubo un error al recuperar información'
            })
        }
    }
}

// Agregar recursos
controllerEcommerce.carouselAddSources = async (req = request, res = response) => {
    const { src, linkTo, display, description } = req.body
    try {
        let carousel = await new Carousel({ src, linkTo, display, description })
        carousel.save()
        res.status(200).json({
            ok: true,
            msg: 'Imagen almacenada correctamente'
        })
    } catch (error) {
        if (error) {
            res.status(400).json({
                ok: false,
                msg: 'No se pudo almacenar la imagen'
            })
        }
    }
}

// Borrar recursos
controllerEcommerce.carouselDeleteSources = async (req = request, res = response) => {
    const { id } = req.headers
    console.log(id)
}

// Editar recursos -- TODO
controllerEcommerce.carouselEditSources = async (req = require, res = response) => {
    const { id_ } = req.headers
    const prop = req.body
    try {
        let editItem = await Carousel.findOneAndUpdate(id_, prop, { new: true })
        console.log(editItem)
        if (editItem) {
            res.status(200).json({
                ok: true,
                msg: 'Se editó el objeto satisfactoriamente',
                cont: editItem
            })
        } else {
            res.status(404).json({
                ok: false,
                msg: 'No se encontró la imagen para editar'
            })
        }
    } catch (error) {
        if (error) {
            res.status(400).json({
                ok: false,
                msg: 'No se pudo editar la información'
            })
        }
    }

}

export default controllerEcommerce