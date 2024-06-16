import express from "express"
import colors from "colors"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import router from "./router"
import db from "./config/db"
import swaggerSpec from "./config/swagger"


// Database connection
export async function connectDb() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue.bold("Conexion a la BD exitosa"))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold("Error al conectar a base de datos"))
    }
}

connectDb()

// Instancia de express
const server = express()

// Permitir conexiones - CORS
const corsOptions : CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error("Error de CORS"))
        }
    }
}
server.use(cors(corsOptions))

// Leer datos formularios
server.use(express.json())

// Loggin
server.use(morgan("dev"))

// Routes
server.use("/api/products", router)

// Docs

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server