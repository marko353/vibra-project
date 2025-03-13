import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contex/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { user } = useAuthContext();

  if (user === null) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
