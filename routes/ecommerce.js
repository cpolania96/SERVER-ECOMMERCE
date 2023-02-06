import express, { Router } from "express";
import controllerEcommerce from "../controllers/controller-ecommerce.js";

const ecommerce = Router()

ecommerce.use(express.json())
ecommerce.use(express.urlencoded({ extended: true }))

ecommerce.get('/carousel/get-sources', controllerEcommerce.carouselGetSources)
ecommerce.post('/carousel/add-sources', controllerEcommerce.carouselAddSources)
ecommerce.delete('/carousel/delete-sources', controllerEcommerce.carouselDeleteSources)
ecommerce.put('/carousel/edit-sources', controllerEcommerce.carouselEditSources)





export default ecommerce