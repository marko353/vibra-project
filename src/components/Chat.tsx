import { useEffect, useReducer, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "../assets/styles/chat.scss";

interface Message {
  _id?: string;
  senderId: string;
  receiverId: string;
  message: string;
}

interface ChatProps {
  selectedUser: { _id: string; fullName: string; profilePictures?: string[] } | null;
  currentUserId: string;
  onClose: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io(API_BASE_URL);

const messagesReducer = (state: Message[], action: { type: string; payload?: Message[] | Message }) => {
  switch (action.type) {
    case "SET_MESSAGES":
      return action.payload as Message[];
    case "ADD_MESSAGE":
      return [...state, action.payload as Message];
    default:
      return state;
  }
};

const Chat: React.FC<ChatProps> = ({ selectedUser, currentUserId, onClose }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, dispatch] = useReducer(messagesReducer, []);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/api/messages/conversations/${currentUserId}/${selectedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "SET_MESSAGES", payload: response.data });
      } catch (error) {
        console.error("Greška pri preuzimanju poruka:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, currentUserId]);

  useEffect(() => {
    if (!currentUserId) return;
    socket.emit("join", currentUserId);

    const messageListener = (newMessage: Message) => {
      console.log("📩 Primljena poruka:", newMessage);
      dispatch({ type: "ADD_MESSAGE", payload: newMessage });
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

    const newMessage = {
      senderId: currentUserId,
      receiverId: selectedUser._id,
      message,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/api/messages/send`, newMessage, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "ADD_MESSAGE", payload: response.data });
      socket.emit("sendMessage", response.data);
      setMessage("");
    } catch (error) {
      console.error("Greška pri slanju poruke:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div
          className="user-avatar"
          style={{ backgroundImage: `url(${selectedUser?.profilePictures?.[0] || ""})` }}
        ></div>
        <div className="user-info">
          <span className="user-name">{selectedUser?.fullName}</span>
        </div>
        <button onClick={onClose} className="close-chat">X</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.senderId === currentUserId ? "message sent" : "message received"}>
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
