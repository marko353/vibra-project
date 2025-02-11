import React, { useState } from 'react';
import '../assets/styles/profile.scss';

const Profile: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(true); // State za prebacivanje između Edit i Slider moda
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dodavanje slika
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files[0]) {
      const newPhotos = [...photos];
      newPhotos[index] = URL.createObjectURL(event.target.files[0]);
      setPhotos(newPhotos);
    }
  };

  // Brisanje slika
  const removeImage = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  // Navigacija slidera
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="profile-container">
      {isEditing ? (
        <div className="edit-photos">
          <div className="profile-card">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="profile-photo">
                {photos[index] ? (
                  <>
                    <img src={photos[index]} alt={`Profile ${index + 1}`} />
                    <button className="remove-photo-btn" onClick={() => removeImage(index)}>X</button>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleImageUpload(event, index)}
                      style={{ display: 'none' }}
                      id={`file-upload-${index}`}
                    />
                    <label htmlFor={`file-upload-${index}`} className="add-photo-btn">+</label>
                  </>
                )}
              </div>
            ))}
          </div>
          <button className="save-btn" onClick={() => setIsEditing(false)}>Save</button>
        </div>
      ) : (
        <div className="slider-container">
          <div className="slider">
            {photos.length > 0 ? (
              <>
                <img src={photos[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                <button className="slider-arrow left" onClick={handlePrev}>‹</button>
                <button className="slider-arrow right" onClick={handleNext}>›</button>
              </>
            ) : (
              <p>No photos available</p>
            )}
          </div>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Photos</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
