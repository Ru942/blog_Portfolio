// src/components/common/PrivateRoute.jsx
//
// Wrap any <Route> that requires the user to be logged in.
// If they aren't, they're redirected to /login and returned here after.

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Pass the attempted URL so Login can redirect back after a successful sign-in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
