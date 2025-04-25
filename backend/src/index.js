import express from "express"
import dotenv from 'dotenv'

import { connectDB} from "./db/db.js";
import cors from 'cors'
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import todoRoutes from "./routes/todo.route.js"


dotenv.config()

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173'
}))


app.use("/api/auth",authRoutes)

app.use("/api/todos",todoRoutes)



const PORT = process.env.PORT

app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`)
    try {
        await connectDB()
        console.log('Successfully connected to MongoDB')
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message)
        process.exit(1)
    }
})