import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../assets/styles/welcome.scss";

const WelcomePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Efekat za učitavanje korisnika nakon prijave
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Preusmeravanje na login ako nema tokena
        } else {
          const response = await axios.get("http://localhost:5000/api/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        setError("There was an error fetching your data. Please try again.");
        navigate("/login"); // Preusmeravanje na login ako dođe do greške
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Možeš dodati loading spinner ili nešto slično
  }

  if (error) {
    return <div>{error}</div>; // Prikazivanje greške
  }

  return (
    <div className="welcome-page">
      <h1>Welcome, {user?.username}!</h1>
      <p>Email: {user?.email}</p>
      <p>Birth Date: {user?.birthDate}</p>
      <p>Address: {user?.address}</p> {/* Popravka na "address" ako je potrebno */}
      <p>Country: {user?.country}</p>
      <button onClick={() => {
        localStorage.removeItem("token"); // Obriši token iz localStorage
        navigate("/login"); // Preusmeri na login stranicu
      }}>
        Log Out
      </button>
    </div>
  );
};

export default WelcomePage;
