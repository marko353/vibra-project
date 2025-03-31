import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatDashboard from "./pages/ChatDashboard";
import { AuthProvider } from "./contex/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import EditPhotos from "./components/EditPhotos";

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
