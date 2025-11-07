import express from "express"
import { updateUser } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.put('/profile',verifyToken,updateUser)

export default router