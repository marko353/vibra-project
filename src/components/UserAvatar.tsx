import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa"; // Dodata ikonica korisnika
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserAvatar: React.FC<UserAvatarProps> = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`);

      localStorage.removeItem("userToken");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.error("Greška pri odjavi:", err);
    }
  };

  return (
    <div className="current-user" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      {currentUser.profilePictures?.[0] ? (
        <img
          src={currentUser.profilePictures[0]}
          alt={currentUser.fullName}
          className="avatar"
        />
      ) : (
        <FaUserCircle className="default-avatar" size={40} />
      )}
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
