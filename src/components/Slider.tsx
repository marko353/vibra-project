import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/slider.scss";

interface User {
  fullName: string;
  birthDate: string;
}

interface ProfileSliderProps {
  images: string[]; 
  user: User | null;
  selectedUser?: User | null; // Dodato: prop za selektovanog korisnika
}

const Slider: React.FC<ProfileSliderProps> = ({ images, user, selectedUser }) => {
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

  const userToDisplay = selectedUser || user; // Koristi selektovanog korisnika, ako postoji

  useEffect(() => {
    if (userToDisplay?.birthDate) {
      console.log("User birth date:", userToDisplay.birthDate);  // Log za korisnički datum rođenja
    }
  }, [userToDisplay]);

  return (
    <div className="profile-slider">
      <div className="slider-container">
        {/* Prikaz imena i godina unutar slidera */}
        {userToDisplay && (
          <div className="user-info">
            <h1>{userToDisplay.fullName}</h1>
            <p>{calculateAge(userToDisplay.birthDate)}</p> {/* Prikazivanje godina */}
          </div>
        )}

        {/* Slika */}
        {images && images.length > 0 ? (
          <div className="image-container">
            <img
              src={images[currentImageIndex]}
              alt={`Profile ${currentImageIndex}`}
              className="profile-image"
            />
            {images.length > 1 && (
              <>
                <button className="prev" onClick={goToPreviousImage}>&lt;</button>
                <button className="next" onClick={goToNextImage}>&gt;</button>
              </>
            )}
          </div>
        ) : (
          <div className="no-image">No images available</div>
        )}
      </div>

      {/* Sakrij dugme ako je selektovan korisnik za chat */}
      {!selectedUser && (
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
