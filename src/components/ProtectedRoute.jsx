import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // We check if 'loggedUser' exists in the "Database" (LocalStorage)
  const user = localStorage.getItem('loggedUser');

  if (!user) {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the page (Home, Watchlist, etc.)
  return children;
};

export default ProtectedRoute;