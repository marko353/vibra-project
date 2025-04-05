
import { useState, useRef, useEffect } from "react";  
import { IoChevronDown } from "react-icons/io5";  
import { FaUserCircle, FaSignOutAlt, FaUserCog, FaCog } from "react-icons/fa";  
import { useNavigate } from "react-router-dom";  
import axios from "axios";  
import "../assets/styles/userAvatar.scss";  
  
interface User {  
  _id: string;  
  fullName: string;  
  role?: string;  
  profilePictures?: string[];  
}  
  
interface UserAvatarProps {  
  currentUser: User;  
  onLogout: () => void;  
}  
  
  
const UserAvatar: React.FC<UserAvatarProps> = ({ currentUser }) => {  
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);  
  const dropdownRef = useRef<HTMLDivElement>(null);  
  const navigate = useNavigate();  
  
  useEffect(() => {  
    const handleClickOutside = (event: MouseEvent) => {  
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {  
        setIsMenuOpen(false);  
      }  
    };  
  
    document.addEventListener("mousedown", handleClickOutside);  
    return () => {  
      document.removeEventListener("mousedown", handleClickOutside);  
    };  
  }, []);  
  
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
  
  const navigateToProfile = () => {  
    navigate("/profile");  
    setIsMenuOpen(false);  
  };  
  
  const navigateToSettings = () => {  
    navigate("/settings");  
    setIsMenuOpen(false);  
  };  
  
  return (  
    <div className="current-user" ref={dropdownRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>  
      <div className="avatar-container">  
        {currentUser.profilePictures?.[0] ? (  
          <img  
            src={currentUser.profilePictures[0]}  
            alt={currentUser.fullName}  
            className="avatar"  
          />  
        ) : (  
          <FaUserCircle className="default-avatar" />  
        )}  
        <div className="status-indicator" />  
      </div>  
  
      <div className="user-info">  
        <div className="user-name">{currentUser.fullName}</div>  
        {currentUser.role && <div className="user-role">{currentUser.role}</div>}  
      </div>  
  
      <IoChevronDown className={`dropdown-icon ${isMenuOpen ? "open" : ""}`} />  
  
      <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>  
        <div className="menu-item" onClick={navigateToProfile}>  
          <FaUserCog className="icon" />  
          Profile  
        </div>  
        <div className="menu-item" onClick={navigateToSettings}>  
          <FaCog className="icon" />  
          Settings  
        </div>  
        <div className="menu-item logout" onClick={handleLogout}>  
          <FaSignOutAlt className="icon" />  
          Logout  
        </div>  
      </div>  
    </div>  
  );  
};  
  
export default UserAvatar;