import express from "express"
import { createUser,renewAccessToken,loginUser,logout } from "../controllers/authController.js"

const router = express.Router()

router.post('/register',createUser)

router.post('/login',loginUser)

router.post('/refresh',renewAccessToken)

router.post('/logout',logout)

export default router