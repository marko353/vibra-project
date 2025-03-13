import React, { useState } from "react";
import "../assets/styles/profileSidebar.scss";

const ProfileSidebar = () => {
  // Preddefinisani tagovi
  const tags = [
    "Nature", "Cities", "Travel", "Sea", "Mountains", "Technology",
    "Music", "Movies", "Sports", "Culture", "Art", "Science", "Planes",
    "Cars", "Fashion", "Fitness", "Health", "Politics", "Education", "Beginners"
  ];

  // Držanje selektovanih tagova
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Držanje osnovnih podataka korisnika
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  // Funkcija koja omogućava selektovanje ili isključivanje tagova
  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((item) => item !== tag); // Ako je tag već selektovan, ukloni ga
      } else {
        return [...prevSelectedTags, tag]; // Ako nije selektovan, dodaj ga
      }
    });
  };

  // Funkcija koja uklanja tag
  const removeTag = (tag: string) => {
    setSelectedTags((prevSelectedTags) => prevSelectedTags.filter((item) => item !== tag));
  };

  // Funkcija za slanje podataka o profilu
  const handleProfileSave = () => {
    console.log("Profile saved:", { name, gender, dob, location, selectedTags });
    // Ovde možete dodati API poziv za slanje podataka
  };

  return (
    <div className="profile-sidebar">
      <h2>Profile Information</h2>

      {/* Name */}
      <div className="profile-input">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Gender */}
      <div className="profile-input">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Date of Birth */}
      <div className="profile-input">
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="profile-input">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Interests (Tags) */}
      <h3>Interests</h3>
      <div className="interests">
        {tags.map((tag, index) => (
          <div key={index} className="interest-tag-container">
            <button
              className={`interest-tag ${selectedTags.includes(tag) ? "active" : ""}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
            {selectedTags.includes(tag) && (
              <button
                className="remove-tag-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                x
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button className="save-button" onClick={handleProfileSave}>
        Save Profile
      </button>

      {/* Logout Button */}
      <button className="logout-button">Logout</button>
    </div>
  );
};

export default ProfileSidebar;
