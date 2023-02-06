import { model, Schema } from "mongoose";

// Esquema para el servicio de carousel
const CarouselSchema = Schema({
    src: {
        require: true,
        type: String
    },
    linkTo: {
        require: false,
        type: String
    },
    display: {
        require: true,
        type: String
    },
    description: {
        require: true,
        type: String
    }
})

export default model('Carousel', CarouselSchema)