import { useEffect, useState, useRef } from "react";
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

const socket = io("http://localhost:5000");

const Chat: React.FC<ChatProps> = ({ selectedUser, currentUserId, onClose }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Učitavanje poruka iz baze za selektovanog korisnika
useEffect(() => {
  if (!selectedUser) return;

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/messages/conversations/${currentUserId}/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data); // Sačuvaj poruke u state-u
    } catch (error) {
      console.error("Greška pri preuzimanju poruka:", error);
    }
  };

  fetchMessages();
}, [selectedUser, currentUserId]);

  // Socket.io konekcija i listener za primanje poruka
  useEffect(() => {
    if (!currentUserId) return;
    socket.emit("join", currentUserId);

    const messageListener = (newMessage: Message) => {
      console.log("📩 Primljena poruka:", newMessage);
      if (
        (newMessage.receiverId === currentUserId && newMessage.senderId === selectedUser?._id) ||
        (newMessage.senderId === currentUserId && newMessage.receiverId === selectedUser?._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on("receiveMessage", messageListener);

    return () => {
      socket.off("receiveMessage", messageListener);
    };
  }, [currentUserId, selectedUser]);

  // Automatsko skrolovanje do poslednje poruke
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Slanje poruke: čuvanje u bazi preko API-ja, a potom emitovanje preko socket-a
  const sendMessage = async () => {
    if (message.trim() === "" || !selectedUser?._id) return;

    const newMessage = {
      senderId: currentUserId,
      receiverId: selectedUser._id,
      message,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/messages/send", newMessage, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Dodaj poruku iz baze u stanje
      setMessages((prevMessages) => [...prevMessages, response.data]);
      // Emituj poruku putem socket-a
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
