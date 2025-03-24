import React, { useEffect, useState } from "react";
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


const ChatDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://vibra-backend-production-c7bc.up.railway.app/api/user/profile-pictures", {
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
        const response = await axios.get("https://vibra-backend-production-c7bc.up.railway.app/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setCurrentUserId(response.data._id);  // Set currentUserId here
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
        const response = await axios.get("https://vibra-backend-production-c7bc.up.railway.app/api/user/all-users", {
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
    if (selectedUser) {
      setSliderImages(selectedUser.profilePictures || []);
    } else {
      setSliderImages(images);
    }
  }, [selectedUser, images]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSliderImages(user.profilePictures || []);
    setIsChatVisible(true);
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
    setSliderImages(images);
    setIsChatVisible(false);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
  
    
   
    <div className="profile-page">
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

      {isChatVisible && selectedUser && (
        <Chat
          selectedUser={selectedUser}
          currentUserId={currentUserId}
          onClose={handleCloseChat}
        />
      )}

      <Slider
        images={sliderImages}
        user={selectedUser || user}
        selectedUser={selectedUser}
      />
    </div>
    
  );
};

export default ChatDashboard;
