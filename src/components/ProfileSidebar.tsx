import React from "react";
import "../assets/styles/profileSidebar.scss";

const ProfileSidebar: React.FC = () => {
  return (
    <div className="profile-sidebar">
      <h2>O meni</h2>
      <textarea placeholder="Napiši nešto o sebi..." />

      <h2>Interesovanja</h2>
      <div className="interests">
        <button className="interest-tag">Muzika</button>
        <button className="interest-tag">Sport</button>
        <button className="interest-tag">Filmovi</button>
      </div>

      <h2>Kakvu vezu želiš?</h2>
      <select>
        <option>Duga veza</option>
        <option>Kratka zabava</option>
        <option>Novi prijatelji</option>
        <option>Još uvek ne znam</option>
      </select>

      <h2>Tvoja visina</h2>
      <input type="number" placeholder="Unesi visinu u cm" />
    </div>
  );
};

export default ProfileSidebar;
