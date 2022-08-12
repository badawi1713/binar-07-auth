import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isLogin, path, children }) => {
  console.log(isLogin);
  if (!isLogin) {
    return <Navigate to={path} replace />;
  }

  return children;
};

export default PrivateRoute;
