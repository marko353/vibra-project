import React, { useState } from 'react';
import '../assets/styles/home.scss';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import Login from '../pages/LoginPage';
import Registration from '../pages/RegistrationPage';

const Home: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  return (
    <div className="home-container">
      <Navbar
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegistrationModal(true)}
      />
      <h1> Let’s vibe together!</h1>
      
      {/* Login dugme iznad Create Account dugmeta */}
      <div className="button-group">
        <div className="login-btn">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowLoginModal(true); }}>
            Login
          </a>
        </div>
        <div className="create-account-btn">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowRegistrationModal(true); }}>
            Create account
          </a>
        </div>
      </div>

      {/* Login Modal */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Login onClose={() => setShowLoginModal(false)} />
      </Modal>

      {/* Registration Modal */}
      <Modal isOpen={showRegistrationModal} onClose={() => setShowRegistrationModal(false)}>
        <Registration onClose={() => setShowRegistrationModal(false)} />
      </Modal>
    </div>
  );
};

export default Home;
