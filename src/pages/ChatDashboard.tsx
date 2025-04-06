import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/styles/chatDashboard.scss';
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
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchUserImages = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_BASE_URL}/api/user/profile-pictures`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const userImages = response.data.profilePictures || [];
                setImages(userImages);
                setSliderImages(userImages);
            } catch (error) {
                console.error("Error fetching user images:", error);
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

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
        setSliderImages(user.profilePictures || []);
        setIsChatVisible(true);
        if (isMobile) {
            setActiveTab("chat");
        }
    };

    const handleCloseChat = () => {
        setSelectedUser(null);
        setIsChatVisible(false);
        setSliderImages(images);
        if (isMobile) {
            setActiveTab("profile");
        }
    };

    const handleTabClick = (tab: "chat" | "profile") => {
        setActiveTab(tab);
    };

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="body">
            <div className={`profile-page ${isChatVisible ? 'chat-open' : ''}`}>
                <div className={`content ${isMobile && activeTab === "chat" ? "chat-active" : ""}`}>
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
                            onLogout={handleLogout}
                        />
                    </div>

                    {isChatVisible && selectedUser && (
                        <div className="chat-content">
                            <Chat
                                selectedUser={selectedUser}
                                currentUserId={currentUserId}
                                onClose={handleCloseChat}
                            />
                        </div>
                    )}

                    <div className={`profile-content ${isMobile ? "mobile-slider" : ""}`}>
                        <Slider
                            images={sliderImages}
                            currentUserId={currentUserId}
                            selectedUser={selectedUser || user}
                        />
                    </div>
                </div>

                {isMobile && (
                    <div className="tab-buttons">
                        <button
                            className={activeTab === "chat" ? "active" : ""}
                            onClick={() => handleTabClick("chat")}
                        >
                            Chat 🗨️
                        </button>
                        <button
                            className={activeTab === "profile" ? "active" : ""}
                            onClick={() => handleTabClick("profile")}
                        >
                            Profile 👤
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatDashboard;