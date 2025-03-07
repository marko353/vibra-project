import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/profilePhotos.scss";
import ProfileSidebar from "../components/ProfileSidebar"

const ProfilePhotos: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);


  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/user/profile-pictures", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched images:", response.data.profilePictures);

      if (response.data && Array.isArray(response.data.profilePictures)) {
        setImages(response.data.profilePictures);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', file);

    setUploading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/upload-profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.imageUrl) {
        const updatedImages = [...images];
        updatedImages[index] = response.data.imageUrl;
        setImages(updatedImages);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    console.log("Sending images to server:", images);
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/user/save-profile-pictures", { images }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Images saved successfully!");

      // Ponovo učitaj slike iz baze da osvežimo prikaz
      await fetchImages();

      navigate('/profile');  // Preusmeri korisnika na stranicu profila
    } catch (error) {
      console.error("Error saving images:", error);
    }
  };

  const handlePreview = () => {
    navigate('/profile');
  };

  const handleClickUpload = (index: number) => {
    if (images[index]) {
      fileInputRefs.current[index]?.click();
    } else {
      const emptySlotIndex = images.length < 9 ? images.length : -1;
      if (emptySlotIndex !== -1 && fileInputRefs.current[emptySlotIndex]) {
        fileInputRefs.current[emptySlotIndex]?.click();
      }
    }
  };

  return (
    <div className="profile-page">
      <ProfileSidebar />
    <div className="profile-photos">
      <h1 className="profile-photos-title">Profile Photos</h1>
      <div className="card-container">
        {Array.from({ length: 9 }).map((_, index) => (
          <div className="photo-card" key={index}>
            <div className="image-box">
              {images[index] ? (
                <>
                  <img className="profile-image" src={images[index]} alt={`Profile ${index + 1}`} />
                  <button className="delete-button" onClick={() => handleDeleteImage(index)}>X</button>
                </>
              ) : (
                <label className="placeholder" onClick={() => handleClickUpload(index)}>
                  +
                </label>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                style={{ display: 'none' }}
                ref={(el) => (fileInputRefs.current[index] = el)}
              />
            </div>
            {images[index] && (
              <button className="change-image-button" onClick={() => handleClickUpload(index)}>
                Change Image
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="button-container">
        <button
          className="preview-button"
          onClick={handlePreview}
        >
          Preview
        </button>
        <button
          className="save-button"
          onClick={handleSave}
          disabled={uploading || images.length === 0}
        >
          {uploading ? 'Uploading...' : 'Save'}
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProfilePhotos;
