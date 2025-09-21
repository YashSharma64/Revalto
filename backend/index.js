import express from "express"
import dotenv from "dotenv"
import { getRouteDetails } from "./Controllers/routedetails.js";

const app = express()

app.use(express.json())

dotenv.config()

// Routes
app.get("/", getRouteDetails)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
