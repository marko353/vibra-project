import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import ikonice
import "../assets/styles/slider.scss";

interface User {
  _id: string; // Dodajte ovo polje za _id
  fullName: string;
  birthDate: string;
}

interface ProfileSliderProps {
  images: string[];
  currentUserId : string | null;
  selectedUser?: User | null;
}

const Slider: React.FC<ProfileSliderProps> = ({ images, currentUserId, selectedUser }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const userToDisplay = selectedUser ;

  useEffect(() => {
    if (userToDisplay?.birthDate) {
      console.log("User birth date:", userToDisplay.birthDate);
    }
  }, [userToDisplay]);

  return (
    <div className="profile-slider">
      <div className="slider-container">
        {userToDisplay && (
          <div className="user-info">
            <h1>{userToDisplay.fullName}</h1>
            <p>{calculateAge(userToDisplay.birthDate)}</p>
          </div>
        )}

        <div className="image-container">
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex]}
              alt={`Profile ${currentImageIndex}`}
              className="profile-image"
            />
          ) : (
            <FaUserCircle className="default-icon" size={100} />
          )}

          {images.length > 1 && (
            <>
              <button className="prev" onClick={goToPreviousImage}>&lt;</button>
              <button className="next" onClick={goToNextImage}>&gt;</button>
            </>
          )}
        </div>
      </div>

      {selectedUser?._id == currentUserId && (
        <div className="edit-button-container">
          <button className="edit-button" onClick={() => navigate('/editPhotos')}>
            Edit Photos
          </button>
        </div>
      )}
    </div>
  );
};

export default Slider;
