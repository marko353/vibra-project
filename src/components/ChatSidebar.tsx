import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../assets/styles/chatSidebar.scss";

interface User {
  _id: string;
  fullName: string;
  birthDate: string;
  profilePictures?: string[];
}

interface ChatSidebarProps {
  currentUser: User;
  chats: User[];
  onUserSelect: (user: User) => void;
}

const socket = io("http://localhost:5000"); // Povezivanje na backend Socket.IO

const ChatSidebar: React.FC<ChatSidebarProps> = ({ currentUser, chats, onUserSelect }) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    socket.emit("join", currentUser._id);

    socket.on("updateOnlineUsers", (onlineUsersList: string[]) => {
      // Filtriraj trenutnog korisnika
      setOnlineUsers(onlineUsersList.filter(userId => userId !== currentUser._id));
    });

    socket.on("newMessage", (data: { senderId: string }) => {
      setUnreadMessages((prev) => ({
        ...prev,
        [data.senderId]: (prev[data.senderId] || 0) + 1,
      }));
    });

    return () => {
      socket.emit("leave", currentUser._id);
      socket.off("updateOnlineUsers");
      socket.off("newMessage");
    };
  }, [currentUser._id]);

  const handleUserSelect = (user: User) => {
    onUserSelect(user);
    setUnreadMessages((prev) => ({ ...prev, [user._id]: 0 })); // Reset brojača poruka
  };

  return (
    <div className="chat-sidebar">
      <div className="current-user">
        <img
          src={currentUser.profilePictures?.[0] || "https://path/to/default-avatar.jpg"}
          alt={currentUser.fullName}
          className="avatar"
        />
        <span className="user-name">{currentUser.fullName}</span>
      </div>

      <h2>Chat</h2>

      <ul className="chat-list">
        {chats
          .filter(chat => chat._id !== currentUser._id) // Ne prikazuj trenutnog korisnika u listi chatova
          .map((chat) => (
            <li key={chat._id} className="chat-item" onClick={() => handleUserSelect(chat)}>
              <div className="chat-avatar">
                <img
                  src={chat.profilePictures?.[0] || "https://path/to/default-avatar.jpg"}
                  alt={chat.fullName}
                  className="avatar"
                />
                {onlineUsers.includes(chat._id) && <span className="online-dot"></span>}
              </div>
              <div className="chat-info">
                <span className="chat-name">{chat.fullName}</span>
                {unreadMessages[chat._id] ? (
                  <span className="unread-badge">{unreadMessages[chat._id]}</span>
                ) : (
                  <span className="chat-message">Klikni za chat</span>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};


export default ChatSidebar;
