import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatDashboard from "./pages/ChatDashboard";
import { AuthProvider } from "./contex/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import EditPhotos from "./components/EditPhotos";
import { io } from "socket.io-client";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const socket = io(API_BASE_URL);


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/chatDashboard" element={<ChatDashboard />} />
            <Route path="/editPhotos" element={<EditPhotos />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
