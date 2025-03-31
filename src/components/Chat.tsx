import { useEffect, useState, useRef } from "react";
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
const socket = io(API_BASE_URL);

const Chat: React.FC<ChatProps> = ({ selectedUser, currentUserId, onClose }) => {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!selectedUser) return;

        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${API_BASE_URL}/api/messages/conversations/${currentUserId}/${selectedUser._id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const sortedMessages = response.data.sort(
                    (a: Message, b: Message) => new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime()
                );

                setMessages(sortedMessages);
            } catch (error) {
                console.error("❌ Greška pri preuzimanju poruka:", error);
            }
        };

        fetchMessages();
    }, [selectedUser, currentUserId]);

    useEffect(() => {
        if (!currentUserId) return;
        if (!socket.connected) { // Dodata provera
            socket.emit("join", currentUserId);
        }

        const messageListener = (newMessage: Message) => {
            setMessages((prevMessages) => {
                if (prevMessages.some((msg) => msg._id === newMessage._id)) return prevMessages;
                return [...prevMessages, newMessage];
            });
        };

        socket.on("receiveMessage", messageListener);

        return () => {
            socket.off("receiveMessage", messageListener);
        };
    }, [currentUserId, selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (message.trim() === "" || !selectedUser?._id) return;

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API_BASE_URL}/api/messages/send`, {
                senderId: currentUserId,
                receiverId: selectedUser._id,
                message,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const savedMessage = response.data;
            setMessages((prevMessages) => [...prevMessages, savedMessage]);
            setMessage("");
            // Uklanjanje slanja savedMessage, jer je server vec sacuvao poruku.
            socket.emit("sendMessage", response.data);
        } catch (error) {
            console.error("❌ Greška pri slanju poruke:", error);
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
                <div
                    className="user-avatar"
                    style={{ backgroundImage: `url(${avatarURL || ""})` }}
                ></div>
                <div className="user-info">
                    <span className="user-name">{selectedUser?.fullName}</span>
                </div>
                <button onClick={onClose} className="close-chat">X</button>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg._id} className={msg.senderId === currentUserId ? "message sent" : "message received"}>
                        <p>{msg.message}</p>
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
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;