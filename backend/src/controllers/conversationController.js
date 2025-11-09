import {prisma} from "../../DB/config.js"

export const getOrCreateConversation = async(req,res) => {
    const {userAId, userBId, postId, purchaseRequestId} = req.body
    if (!userAId || !userBId || !postId) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try{
        let conversation = await prisma.conversation.findFirst({
            where: { 
                userAId, 
                userBId, 
                postId },
            include: { 
                messages: true },
    });

    if(!conversation){
        conversation = await prisma.conversation.create({
            data: {
                userAId,
                userBId,
                postId,
                purchaseRequestId,
            },
            include: { messages: true },
        });
    }

    res.status(200).json(conversation);
  }catch(error){
        console.error("Error creating/getting conversation:", error);
        res.status(500).json({ message: "Internal Server Error" });
  }
}


export const getMessages = async (req, res) => {
    const { conversationId } = req.params;
    try{
        const messages = await prisma.message.findMany({
            where: { 
                conversationId: Number(conversationId) 
            },
            orderBy: { 
                createdAt: "asc" 
            },
            include: {
                sender: {
                    select: { 
                        id: true, 
                        userName: true, 
                        imgUrl: true },
                },
            },
        });

        res.status(200).json(messages);
    }catch(error){
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const sendMessage = async (req, res) => {
    const { conversationId, senderId, text } = req.body;

    if(!conversationId || !senderId || !text){
        return res.status(400).json({ 
            message: "conversationId, senderId and text are required" 
        });
    }

    try {
        const message = await prisma.message.create({
        data: {
            conversationId,
            senderId,
            text,
        },
        include: {
            sender: {
            select: { id: true, userName: true, imgUrl: true },
            },
        },
        });

        res.status(201).json(message);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};