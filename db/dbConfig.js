import { connect } from "mongoose";
import { config } from "dotenv";

const { DB_URLCONNECT } = config().parsed

const dbConnection = async () => {
    try {
        await connect(DB_URLCONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`DB IS ONLINE`);
    } catch (error) {
        throw new Error(`Error en DB: ${error}`)
    }
}

export default dbConnection