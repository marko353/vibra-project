import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/profilePage.scss";
import ProfileSlider from "../components/ProfileSlider";
import ChatSidebar from "../components/ChatSidebar";
import Chat from "../components/Chat";

interface User {
  _id: string;
  fullName: string;
  birthDate: string;
  profilePictures?: string[];
}

const ProfilePage: React.FC = () => {
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
        const response = await axios.get("http://localhost:5000/api/user/profile-pictures", {
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
        const response = await axios.get("http://localhost:5000/api/user/profile", {
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
        const response = await axios.get("http://localhost:5000/api/user/all-users", {
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
      <ChatSidebar
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

      <ProfileSlider 
        images={sliderImages} 
        user={selectedUser || user} 
        selectedUser={selectedUser} 
      />
    </div>
  );
};

export default ProfilePage;
