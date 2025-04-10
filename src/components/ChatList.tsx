import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "../assets/styles/chatList.scss";
import UserAvatar from "./UserAvatar";


interface User {
    _id: string;
    fullName: string;
    profilePictures?: string[];
    birthDate: string;
}

interface ChatSidebarProps {
    chats: User[];
    currentUser: User;
    onUserSelect: (user: User) => void;
    onLogout: () => void; // Dodajemo onLogout u props
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(API_BASE_URL);

const ChatList: React.FC<ChatSidebarProps> = ({ 
    chats, 
    currentUser, 
    onUserSelect, 
    onLogout // Prihvatamo onLogout iz propsa
}) => {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [unreadMessages, setUnreadMessages] = useState<{ [key: string]: number }>({});
    const [lastMessages, setLastMessages] = useState<{ [key: string]: string }>({});

  

    useEffect(() => {
        if (!currentUser) return;

        socket.emit("join", currentUser._id);

        socket.on("updateOnlineUsers", (onlineUsersList: string[]) => {
            setOnlineUsers(onlineUsersList.filter(userId => userId !== currentUser._id));
        });

        socket.on("newMessage", (data: { senderId: string; text: string }) => {
            setUnreadMessages((prev) => ({
                ...prev,
                [data.senderId]: (prev[data.senderId] || 0) + 1,
            }));

            setLastMessages((prev) => ({
                ...prev,
                [data.senderId]: data.text,
            }));
        });

        return () => {
            socket.emit("leave", currentUser._id);
            socket.off("updateOnlineUsers");
            socket.off("newMessage");
        };
    }, [currentUser]);

    useEffect(() => {
        const fetchLastMessages = async () => {
            try {
                if (!currentUser) return;
                const response = await axios.get(`${API_BASE_URL}/api/messages/last/${currentUser._id}`);
                const messagesMap: { [key: string]: string } = {};
                response.data.forEach((msg: { _id: string; lastMessage: string }) => {
                    messagesMap[msg._id] = msg.lastMessage;
                });
                setLastMessages(messagesMap);
            } catch (error) {
                console.error("Greška pri preuzimanju poslednjih poruka:", error);
            }
        };

        fetchLastMessages();
    }, [chats, currentUser]);

    const handleUserSelect = (user: User) => {
        onUserSelect(user);
        setUnreadMessages((prev) => ({ ...prev, [user._id]: 0 }));
    };

    // Uklonili smo lokalnu handleLogout funkciju jer koristimo onLogout iz propsa

    if (!currentUser) return <p>Učitavanje...</p>;

    return (
        <div className="chat-sidebar">
            {/* Prosleđujemo onLogout u UserAvatar */}
            <UserAvatar currentUser={currentUser} onLogout={onLogout} />

            <h2>Chat list</h2>

            <ul className="chat-list">
                {chats
                    .filter(chat => chat._id !== currentUser._id)
                    .map((chat) => (
                        <li key={chat._id} className="chat-item" onClick={() => handleUserSelect(chat)}>
                            <div className="chat-avatar">
                                <img
                                    src={chat.profilePictures?.[0] || "https://path/to/default-avatar.jpg"}
                                    alt={chat.fullName}
                                    className="avatar"
                                />
                                {onlineUsers.includes(chat._id) && <span className="online-dot"></span>}
                                {unreadMessages[chat._id] > 0 && (
                                    <span className="unread-badge">{unreadMessages[chat._id]}</span>
                                )}
                            </div>
                            <div className="chat-info">
                                <span className="chat-name">{chat.fullName}</span>
                                <span className="last-message">
                                    {lastMessages[chat._id] || "Nema poruka"}
                                </span>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ChatList;