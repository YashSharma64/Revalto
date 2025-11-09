import express from "express";
import {getOrCreateConversation, getMessages,sendMessage} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/", getOrCreateConversation);
router.get("/:conversationId/messages", getMessages);
router.post("/message", sendMessage);

export default router;
