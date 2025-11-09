import express from "express";
import {getOrCreateConversation, getMessages, sendMessage, getUserConversations} from "../controllers/conversationController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getUserConversations); // Get all conversations for authenticated user
router.post("/", getOrCreateConversation);
router.get("/:conversationId/messages",verifyToken, getMessages);
router.post("/message", sendMessage);

export default router;
