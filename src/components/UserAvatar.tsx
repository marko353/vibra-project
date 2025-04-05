import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaUserCircle, FaSignOutAlt, FaUserCog, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../assets/styles/userAvatar.scss";

interface User {
  _id: string;
  fullName: string;
  role?: string;
  profilePictures?: string[];
}

interface UserAvatarProps {
  currentUser: User | null;
  onLogout: () => Promise<void> | void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ currentUser, onLogout }) => {
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
  }, [dropdownRef]);

  const navigateToProfile = () => {
    navigate("/profile");
    setIsMenuOpen(false);
  };

  const navigateToSettings = () => {
    navigate("/settings");
    setIsMenuOpen(false);
  };

  if (!currentUser) {
    return <div className="current-user">Loading...</div>;
  }

  return (
    <div
      className="current-user"
      ref={dropdownRef}
      onClick={(e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
      }}
      aria-haspopup="true"
      aria-expanded={isMenuOpen}
    >
      <div className="avatar-container">
        {currentUser.profilePictures?.[0] ? (
          <img
            src={currentUser.profilePictures[0]}
            alt={`Profile picture of ${currentUser.fullName}`}
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

      {isMenuOpen && (
        <div
          className="dropdown-menu open"
          onClick={(e) => e.stopPropagation()}
          role="menu"
        >
          <div className="menu-item" onClick={navigateToProfile} role="menuitem">
            <FaUserCog className="icon" />
            Profile
          </div>
          <div className="menu-item" onClick={navigateToSettings} role="menuitem">
            <FaCog className="icon" />
            Settings
          </div>
          <div 
            className="menu-item logout" 
            onClick={() => {
              onLogout();
              setIsMenuOpen(false);
            }} 
            role="menuitem"
          >
            <FaSignOutAlt className="icon" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;