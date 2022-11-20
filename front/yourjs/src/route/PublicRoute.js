import React from 'react';
import { Navigate } from 'react-router-dom';
const PublicRoute = ({ children }) => {
  return JSON.parse(sessionStorage.getItem('loginState')) ? (
    <Navigate to="/calendar" />
  ) : (
    children
  );
};

export default PublicRoute;
