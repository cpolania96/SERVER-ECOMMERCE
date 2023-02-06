import { config } from 'dotenv'
import express from 'express'
import dbConnection from './db/dbConfig.js'
import auth from './routes/auth.js'
import cors from 'cors'
import ecommerce from './routes/ecommerce.js'

// SERVIDOR
const { SRV_PORT } = config().parsed
const PORT = SRV_PORT || 9000
const app = express()
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${SRV_PORT}`);
})
server.on('error', err => console.log(`Error en servidor: ${err}`))

// DATABASE
dbConnection()

// CORS
app.use(cors())

// RUTAS
app.use('/api/auth', auth)
app.use('/api/ecommerce', ecommerce)

