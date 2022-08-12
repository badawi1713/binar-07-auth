import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, SplashScreen } from "./views/components";
import { Dashboard, Home, Login, Page404, Register } from "./views/pages";
const App = () => {
  const [isLogin, setIsLogin] = useState(null);
  const [checkLogin, setCheckLogin] = useState(true);

  useEffect(() => {
    const checkIfLogin = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    };
    checkIfLogin();
    const splashScreenTimeout = setTimeout(() => {
      setCheckLogin(false);
    }, 1000);

    return () => {
      clearTimeout(splashScreenTimeout);
    };
  }, []);

  if (checkLogin) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLogin={isLogin}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
