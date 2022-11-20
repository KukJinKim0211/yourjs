import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  return !JSON.parse(sessionStorage.getItem('loginState')) ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

export default PrivateRoute;
