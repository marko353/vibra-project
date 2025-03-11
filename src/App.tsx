import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProfilePhotos from './components/ProfilePhotos';
import Chat from './components/Chat';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profilePhotos" element={<ProfilePhotos />} />
          <Route path="/chat" element={<Chat selectedUser={null} currentUserId={''} onClose={() => { }} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
