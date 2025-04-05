Update UserAvatar.tsx"/settings");
    setIsMenuOpen(false);
  };

  return (
<div className="current-user" ref={dropdownRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
    {/* avatar, user-info, strelica */}
  </div> {currentUscurrentUser.profilePictures[0]}
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
