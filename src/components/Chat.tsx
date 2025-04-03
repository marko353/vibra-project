import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "../assets/styles/chat.scss";
import { GrEmoji } from "react-icons/gr";

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
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const socket = useMemo(() => io(API_BASE_URL, {
    transports: ["websocket"],
    autoConnect: false
  }), []);

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const onEmojiClick = useCallback((emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    if (!currentUserId || !selectedUser) return;

    socket.connect();
    socket.emit("join", currentUserId);

    const messageListener = (newMessage: Message) => {
      setMessages(prev => {
        if (prev.some(msg => msg._id === newMessage._id)) return prev;
        return [...prev, newMessage];
      });
    };

    const typingListener = (userId: string) => {
      if (userId === selectedUser._id) {
        setOtherUserTyping(true);
        const timeout = setTimeout(() => setOtherUserTyping(false), 3000);
        return () => clearTimeout(timeout);
      }
    };

    socket.on("receiveMessage", messageListener);
    socket.on("typing", typingListener);

    return () => {
      socket.off("receiveMessage", messageListener);
      socket.off("typing", typingListener);
      socket.disconnect();
    };
  }, [currentUserId, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, otherUserTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    if (!typingTimeout) {
      socket.emit("typing", currentUserId);
    }

    clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      setTypingTimeout(undefined);
    }, 2000);
    setTypingTimeout(timeout);
  };

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
        <div className="back-arrow" onClick={onClose}>←</div>
        <div className="user-avatar" style={{ backgroundImage: `url(${avatarURL || ""})` }}></div>
        <div className="user-info">
          <span className="user-name">{selectedUser?.fullName}</span>
          {otherUserTyping && (
            <span className="typing-status">
              <span className="typing-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
              kuca...
            </span>
          )}
        </div>
        <button className="close-chat" onClick={onClose}>×</button>
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
        {otherUserTyping && (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <div className="emoji-picker-wrapper" ref={emojiPickerRef}>
          <button 
            className="emojiButton"
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <GrEmoji />
          </button>
          {showEmojiPicker && (
            <div className="emoji-picker-container visible">
              <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
            </div>
          )}
        </div>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Write a message..."
        />
        <button className="buttonS" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;