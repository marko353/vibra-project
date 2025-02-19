import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../assets/styles/profilePage.scss";
import ProfileSlider from "../components/ProfileSlider";

interface User {
  fullName: string;
  birthDate: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const location = useLocation();

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/profile-pictures", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Slike preuzete:", response.data.profilePictures);
        setImages(response.data.profilePictures);
      } catch (error) {
        console.error("Greška pri preuzimanju slika:", error);
      }
    };

    fetchUserImages();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (location.state && (location.state as any).images) {
      setImages((location.state as any).images);
    }
  }, [location.state]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <ProfileSlider images={images} user={user} />
    </div>
  );
};

export default ProfilePage;
