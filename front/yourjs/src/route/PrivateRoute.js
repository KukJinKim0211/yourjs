import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  return !JSON.parse(sessionStorage.getItem('loginState')) ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

export default PrivateRoute;
