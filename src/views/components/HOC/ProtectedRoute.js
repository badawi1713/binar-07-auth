import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const authContextData = useContext(AuthContext);
  const { isLogin } = authContextData;
  if (!isLogin) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
