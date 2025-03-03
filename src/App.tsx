import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import ProfilePage from './pages/ProfilePage';
import ProfilePhotos from './components/ProfilePhotos';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profilePhotos" element={<ProfilePhotos />} /> 
        <Route path="/" element={<Chat selectedUser={null} currentUserId={''} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />} /> 
      </Routes>
    </Router>
  );
};

export default App;
