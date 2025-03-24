import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/navbar.scss";

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <img src="/logo.svg" alt="Vibra Logo" />
        </div>

        {/* Desktop linkovi */}
        <ul className="navbar-links">
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/support">Support</Link>
          </li>
          <li>
            <Link to="/download">Download</Link>
          </li>
        </ul>

        {/* Login dugme */}
        <div className="navbar-login">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLoginClick();
            }}
          >
            Login
          </a>
        </div>

        {/* Burger dugme */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </nav>

      {/* Mobilni meni */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/support" onClick={() => setMenuOpen(false)}>
              Support
            </Link>
          </li>
          <li>
            <Link to="/download" onClick={() => setMenuOpen(false)}>
              Download
            </Link>
          </li>
        </ul>

      
        <div className="mobile-buttons">
          <a
            href="#"
            className="login-btn"
            onClick={(e) => {
              e.preventDefault();
              onLoginClick();
              setMenuOpen(false);
            }}
          >
            Login
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onRegisterClick();
              setMenuOpen(false);
            }}
          >
            Create Account
          </a>
        </div>
      </div>

      {/* Overlay (klikom zatvara meni) */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
};

export default Navbar;
