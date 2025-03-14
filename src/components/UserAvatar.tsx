import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../assets/styles/userAvatar.scss";
import axios from "axios";

interface User {
  _id: string;
  fullName: string;
  profilePictures?: string[];
}

interface UserAvatarProps {
  currentUser: User;
  onLogout: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

// React frontend - handleLogout
const handleLogout = async () => {
  try {
    await axios.post("http://localhost:5000/api/auth/logout");
 
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentUser");
    navigate("/");
  } catch (err) {
    console.error("Greška pri odjavi:", err);
  }
};


  return (
    <div className="current-user" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <img
        src={currentUser.profilePictures?.[0] || "https://path/to/default-avatar.jpg"}
        alt={currentUser.fullName}
        className="avatar"
      />
      <span className="user-name">{currentUser.fullName}</span>
      <IoChevronDown className={`dropdown-icon ${isMenuOpen ? "open" : ""}`} />

      {isMenuOpen && (
        <div className="dropdown-menu">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
