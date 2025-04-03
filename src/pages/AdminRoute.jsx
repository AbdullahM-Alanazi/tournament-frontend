import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../App";

function AdminRoute({ children }) {
  const {
    user: { isAdmin },
  } = useContext(userContext);
  if (!isAdmin) {
    return <Navigate to='/' />;
  }
  return children;
}

export default AdminRoute;
