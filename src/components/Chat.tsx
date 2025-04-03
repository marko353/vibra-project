import { useEffect, useState, useRef, useMemo } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "../assets/styles/chat.scss";

interface Message {
    _id?: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt?: string;
}

interface ChatProps {
    selectedUser: { _id: string; fullName: string; profilePictures?: string[] } | null;
    currentUserId: string;
    onClose: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Chat: React.FC<ChatProps> = ({ selectedUser, currentUserId, onClose }) => {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const socket = useMemo(() => io(API_BASE_URL, {
        transports: ["websocket"],
        autoConnect: false
    }), []);

    const formatTime = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    useEffect(() => {
        if (!selectedUser) return;

        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${API_BASE_URL}/api/messages/conversations/${currentUserId}/${selectedUser._id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setMessages(response.data);
            } catch (error) {
                console.error("Greška pri preuzimanju poruka:", error);
            }
        };

        fetchMessages();

        return () => {
            setMessages([]);
        };
    }, [selectedUser?._id, currentUserId]);

    useEffect(() => {
        if (!currentUserId) return;

        socket.connect();
        socket.emit("join", currentUserId);

        const messageListener = (newMessage: Message) => {
            setMessages(prev => {
                if (prev.some(msg => msg._id === newMessage._id)) return prev;
                return [...prev, newMessage];
            });
        };

        socket.on("receiveMessage", messageListener);

        return () => {
            socket.off("receiveMessage", messageListener);
            socket.disconnect();
        };
    }, [currentUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (message.trim() === "" || !selectedUser?._id) return;

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${API_BASE_URL}/api/messages/send`,
                {
                    senderId: currentUserId,
                    receiverId: selectedUser._id,
                    message: message.trim(),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const savedMessage = response.data;
            setMessages(prev => [...prev, savedMessage]);
            setMessage("");
            socket.emit("sendMessage", savedMessage);
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            console.error("Greška pri slanju poruke:", error);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const avatarURL = selectedUser?.profilePictures?.[0];

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="user-avatar" style={{ backgroundImage: `url(${avatarURL || ""})` }}></div>
                <div className="user-info">
                    <span className="user-name">{selectedUser?.fullName}</span>
                </div>
                <button onClick={onClose} className="close-chat">
                    X
                </button>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg._id || msg.createdAt} 
                         className={msg.senderId === currentUserId ? "message sent" : "message received"}>
                        <p>{msg.message}</p>
                        <span className="message-time">
                            {formatTime(msg.createdAt)}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Napišite poruku..."
                />
                <button onClick={sendMessage}>Pošalji</button>
            </div>
        </div>
    );
};

export default Chat;