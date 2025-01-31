import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage';    
import Home from './pages/HomePage';
import Registration from './pages/RegistrationPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

