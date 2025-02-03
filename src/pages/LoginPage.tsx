import React, { useState } from 'react';
import '../assets/styles/login.scss';

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    onClose(); // Zatvori modal nakon uspešnog logina
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <img 
          src="./src/assets/images/Page0.png"
          alt="Logo"
          className="form-logo"
        />
        <h2>Welcome Back!</h2>
        <p>Sign in to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
    
      </div>
    </div>
  );
};

export default Login;