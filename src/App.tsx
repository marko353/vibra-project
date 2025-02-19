import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import ProfilePage from './pages/ProfilePage';
import ProfilePhotos from './components/ProfilePhotos';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profilePhotos" element={<ProfilePhotos />} /> {/* Ažurirana putanja rute */}
      </Routes>
    </Router>
  );
};

export default App;
