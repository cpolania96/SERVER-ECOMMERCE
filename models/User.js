import { model, Schema } from 'mongoose'

const userSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    roles: {
        type: Array,
        default: 'user'
    }
})

export default model('User', userSchema)