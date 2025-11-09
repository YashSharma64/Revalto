import { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/Services/api";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

function ConversationSelector({ onSelectConversation }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await api.get("/conversations");
        setConversations(res.data || []);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setError("Failed to load conversations");
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);


  if (!user) {
    return (
      <div className="flex flex-col h-[80vh] w-full max-w-lg mx-auto border rounded-2xl shadow-lg bg-white items-center justify-center p-6">
        <div className="text-red-500 text-center">You must be logged in to chat</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-lg mx-auto border rounded-2xl shadow-lg bg-white">
      <div className="p-6 border-b">
        <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Select a Conversation</h2>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading conversations...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : conversations.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No conversations yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((conv) => {

              const otherUser = conv.otherUser;
              const lastMessage = conv.messages?.[0];
              
              const fallbackOtherUser = Number(conv.userAId) === Number(user.id) ? conv.userB : conv.userA;
              const finalOtherUser = otherUser || fallbackOtherUser;
              
              const displayOtherUser = finalOtherUser;
              
              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {displayOtherUser?.imgUrl ? (
                        <img src={displayOtherUser.imgUrl} alt={displayOtherUser.userName || displayOtherUser.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-gray-500 text-lg font-semibold">
                          {(displayOtherUser?.userName || displayOtherUser?.name || "?")[0]?.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 truncate">
                        {displayOtherUser?.userName || displayOtherUser?.name || "Unknown User"}
                      </div>
                      {conv.post && (
                        <div className="text-sm text-gray-500 truncate">
                          {conv.post.itemName}
                        </div>
                      )}
                      {lastMessage && (
                        <div className="text-sm text-gray-400 truncate mt-1">
                          {Number(lastMessage.sender?.id) === Number(user.id) ? "You: " : `${lastMessage.sender?.userName || lastMessage.sender?.name || "Other"}: `}
                          {lastMessage.text}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 whitespace-nowrap">
                      {lastMessage && new Date(lastMessage.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatRoom({ conversationId: propConversationId }) {
    const { socket, isConnected } = useSocket();
    const { user } = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams] = useSearchParams();
    
    const conversationId = propConversationId || params.conversationId || searchParams.get("conversationId");
    
    const userId = user?.id;
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!conversationId) {
        setError("No conversation ID provided");
        setLoading(false);
        return;
        }

        const fetchMessages = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.get(`/conversations/${conversationId}/messages`);
            setMessages(res.data || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
            setError("Failed to load messages. Please try again.");
        } finally {
            setLoading(false);
        }
        };
        fetchMessages();
    }, [conversationId]);

    useEffect(() => {
        if (!socket || !conversationId || !isConnected) {
            return;
        }

        const joinRoom = () => {
            console.log(`📞 Joining conversation_${conversationId}`);
            socket.emit("joinConversation", Number(conversationId));
        };

        if (isConnected) {
            joinRoom();
        }
        socket.on("connect", joinRoom);

        const handleReceive = (msg) => {
            setMessages((prev) => {
                if (prev.some(m => m.id === msg.id)) {
                return prev;
                }
                return [...prev, msg];
            });
        };

        socket.on("receiveMessage", handleReceive);

        return () => {
            socket.off("receiveMessage", handleReceive);
        };
    }, [socket, conversationId, isConnected]);

    const sendMessage = () => {
        if (!text.trim() || !socket || !isConnected) {
        if (!isConnected) {
            setError("Not connected to server. Please refresh the page.");
        }
        return;
        }

        if (!userId) {
        setError("You must be logged in to send messages");
        return;
        }

        const messageData = {
            conversationId: Number(conversationId),
            text: text.trim(),
        };

        const messageText = text.trim();
        console.log(messageText)
        setText("");

        socket.emit("sendMessage", messageData, (ack) => {
            if (ack && ack.status === "ok") {
                setMessages((prev) => {
                    if (prev.some(m => m.id === ack.message.id)) {
                        return prev;
                }
                    return [...prev, ack.message];
                });
                setError(null);
            } else {
                setError(ack?.error || "Failed to send message. Please try again.");
                setText(messageText);
            }
        });
    };

    if (loading) {
        return (
        <div className="flex flex-col h-[80vh] w-full max-w-lg mx-auto border rounded-2xl shadow-lg bg-white items-center justify-center">
            <div className="text-gray-500">Loading messages...</div>
        </div>
        );
    }

    if (!conversationId) {
        return <ConversationSelector onSelectConversation={(id) => {
            navigate(`/chat/${id}`);
        }} />;
    }

    if (!userId) {
        return (
        <div className="flex flex-col h-[80vh] w-full max-w-lg mx-auto border rounded-2xl shadow-lg bg-white items-center justify-center">
            <div className="text-red-500">You must be logged in to chat</div>
        </div>
        );
    }

    const getSenderId = (msg) => {
        return msg.senderId || msg.sender?.id;
    };

    return (
        <div className="flex flex-col h-[80vh] w-full max-w-lg mx-auto border rounded-2xl shadow-lg bg-white">
        {/* Connection Status */}
        {!isConnected && (
            <div className="bg-yellow-100 text-yellow-800 text-sm p-2 text-center">
            ⚠️ Connecting to server...
            </div>
        )}

        {/* Error Message */}
        {error && (
            <div className="bg-red-100 text-red-800 text-sm p-2 text-center">
            {error}
            </div>
        )}

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-4">
                No messages yet. Start the conversation!
            </div>
            ) : (
            messages.map((msg) => {
                const senderId = getSenderId(msg);
                const isOwnMessage = senderId === userId;
                
                return (
                <div
                    key={msg.id}
                    className={`mb-3 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                >
                    <div className={`flex flex-col max-w-xs ${isOwnMessage ? "items-end" : "items-start"}`}>
                    {!isOwnMessage && msg.sender && (
                        <div className="text-xs text-gray-500 mb-1 px-2">
                        {msg.sender.userName || "Unknown"}
                        </div>
                    )}
                    <div
                        className={`px-4 py-2 rounded-2xl ${
                        isOwnMessage
                            ? "bg-blue-500 text-white rounded-br-sm"
                            : "bg-gray-200 text-gray-800 rounded-bl-sm"
                        }`}
                    >
                        {msg.text}
                    </div>
                    <div className={`text-xs text-gray-400 mt-1 px-2 ${isOwnMessage ? "text-right" : "text-left"}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                        })}
                    </div>
                    </div>
                </div>
                );
            })
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 flex gap-2 border-t">
            <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
                }
            }}
            disabled={!isConnected}
            className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={isConnected ? "Type a message..." : "Connecting..."}
            />
            <button
            onClick={sendMessage}
            disabled={!isConnected || !text.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
            Send
            </button>
        </div>
        </div>
    );
}
