import { prisma } from "../../DB/config.js";

export default function chatSocket(io) {
    io.on("connection", (socket) => {
        console.log("⚡ User connected:", socket.id);

        socket.on("joinConversation", (conversationId) => {
            socket.join(`conversation_${conversationId}`);
            console.log(`User joined conversation_${conversationId}`);
        });

        // Handle incoming message
        socket.on("sendMessage", async (data) => {
            const { conversationId, senderId, text } = data;

            try {
                const message = await prisma.message.create({
                data: { conversationId, senderId, text },
                include: {
                    sender: {
                        select: { 
                            id: true, 
                            userName: true, 
                            imgUrl: true },
                    },
                },
                });

                // Emit to everyone in the room
                io.to(`conversation_${conversationId}`).emit("receiveMessage", message);
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });

        // Handle disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
  });
}
