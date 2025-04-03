import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../App";

function ProtectedRoute({ children }) {
  const {
    user: { isAuthenticed },
  } = useContext(userContext);
  if (!isAuthenticed) {
    return <Navigate to='/auth/login' />;
  }
  return children;
}

export default ProtectedRoute;
