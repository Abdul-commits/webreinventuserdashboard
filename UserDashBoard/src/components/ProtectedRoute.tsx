// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ProtectedRouteProps {
  component: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const isAuthenticated = !!token; // Check if token exists

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <Component />;
};

export default ProtectedRoute;
