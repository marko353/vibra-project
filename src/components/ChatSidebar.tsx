import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IoChevronDown } from "react-icons/io5"; 
import "../assets/styles/chatSidebar.scss";
import { useNavigate } from "react-router-dom";


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
  onLogout: () => void;
}

const socket = io("http://localhost:5000");

const ChatSidebar: React.FC<ChatSidebarProps> = ({ currentUser, chats, onUserSelect, onLogout }) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<{ [key: string]: number }>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", currentUser._id);

    socket.on("updateOnlineUsers", (onlineUsersList: string[]) => {
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
    setUnreadMessages((prev) => ({ ...prev, [user._id]: 0 }));
  };
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Ako koristiš token za autentifikaciju
    navigate("/"); // Preusmeravanje na login stranicu
  };

  return (
    <div className="chat-sidebar">
      {/* Current User - Klikom se otvara meni */}
      <div className="current-user" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <img
          src={currentUser.profilePictures?.[0] || "https://path/to/default-avatar.jpg"}
          alt={currentUser.fullName}
          className="avatar"
        />
        <span className="user-name">{currentUser.fullName}</span>
        <IoChevronDown className={`dropdown-icon ${isMenuOpen ? "open" : ""}`} />
        
        {/* Dropdown meni za logout */}
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

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
                  {unreadMessages[chat._id] ? "New message" : "Klikni za chat"}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
