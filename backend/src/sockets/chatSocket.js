import { prisma } from "../../DB/config.js";

export default function chatSocket(io) {
  io.on("connection", (socket) => {
    console.log(`⚡ User connected: ${socket.id} (userId: ${socket.user?.id})`);

    // Join a conversation room
    socket.on("joinConversation", (conversationId) => {
      socket.join(`conversation_${conversationId}`);
      console.log(`✅ User ${socket.user?.id} joined room conversation_${conversationId}`);
    });

    // Handle sending a new message
    socket.on("sendMessage", async (data, callback) => {
      try {
        // Always get sender from verified JWT
        const senderId = socket.user?.id;

        if (!senderId) {
          console.warn("⚠️ Unauthorized socket tried to send message");
          return callback({ status: "error", error: "Unauthorized" });
        }

        const { conversationId, text } = data;

        // Basic validation
        if (!conversationId || !text?.trim()) {
          return callback({ status: "error", error: "Invalid message data" });
        }

        // Save the message to DB
        const message = await prisma.message.create({
          data: {
            conversationId,
            senderId,
            text,
          },
          include: {
            sender: {
              select: {
                id: true,
                userName: true,
                imgUrl: true,
              },
            },
          },
        });

        console.log(
          `💬 New message from user ${senderId} in conversation_${conversationId}`
        );

        // Broadcast the message to everyone else in the room (excluding sender)
        io.to(`conversation_${conversationId}`).emit("receiveMessage", message);

        // Send acknowledgment back to sender with the message
        callback({ status: "ok", message });
      } catch (err) {
        console.error("❌ Error handling sendMessage:", err);
        callback({ status: "error", error: "Failed to save message" });
      }
    });

    // Handle user disconnecting
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
}
