import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isLogin, children }) => {
  console.log(isLogin);
  if (!isLogin) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default PrivateRoute;
