import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import postRoutes from "./routes/postRoutes.js";
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))

dotenv.config()

app.use('/',authRoutes)
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});
