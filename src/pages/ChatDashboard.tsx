import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/chatDashboard.scss";
import Slider from "../components/Slider";
import Chat from "../components/Chat";
import ChatList from "../components/ChatList";

interface User {
    _id: string;
    fullName: string;
    birthDate: string;
    profilePictures?: string[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChatDashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [sliderImages, setSliderImages] = useState<string[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
    const [currentUserId, setCurrentUserId] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"chat" | "profile">("profile");
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

    useEffect(() => {
        const fetchUserImages = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_BASE_URL}/api/user/profile-pictures`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setImages(response.data.profilePictures || []);
                setSliderImages(response.data.profilePictures || []);
            } catch (error) {
                console.error("Greška pri preuzimanju slika:", error);
            }
        };
        fetchUserImages();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                setCurrentUserId(response.data._id);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_BASE_URL}/api/user/all-users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
        setIsChatVisible(true);
        if (isMobile) {
            setActiveTab("chat");
        }
    };

    const handleCloseChat = () => {
        setSelectedUser(null);
        setIsChatVisible(false);
        if (isMobile) {
          setActiveTab("profile");
        }
    };

    const handleTabClick = (tab: "chat" | "profile") => {
        setActiveTab(tab);
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-page">
            <div className={`content ${activeTab === "chat" && isMobile ? "chat-active" : ""} ${activeTab === "profile" && isMobile ? "profile-active" : ""}`}>
                <div className="chat-list-container">
                    <ChatList
                        currentUser={{
                            _id: user._id,
                            fullName: user.fullName,
                            profilePictures: images,
                            birthDate: user.birthDate,
                        }}
                        chats={users}
                        onUserSelect={handleSelectUser}
                    />
                </div>

                {isChatVisible && selectedUser && (
                    <div className="chat-content">
                        <Chat selectedUser={selectedUser} currentUserId={currentUserId} onClose={handleCloseChat} />
                    </div>
                )}

                   {activeTab === "profile" && !isChatVisible && (
                        <div className="profile-content">
              <Slider images={sliderImages} user={selectedUser || user} />
                   </div>
)}
            </div>

            <div className="tab-buttons">
                <button className={activeTab === "chat" ? "active" : ""} onClick={() => handleTabClick("chat")}>
                    Chat ️ 🗨️
                </button>
                <button className={activeTab === "profile" ? "active" : ""} onClick={() => handleTabClick("profile")}>
                    Profil  👤
                </button>
            </div>
        </div>
    );
};

export default ChatDashboard;