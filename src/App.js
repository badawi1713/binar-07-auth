import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PrivateRoute, SplashScreen } from "./views/components";
import { Dashboard, Login, Register } from "./views/pages";
const App = () => {
  const [isLogin, setIsLogin] = useState(null);
  const [checkLogin, setCheckLogin] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      navigate("/");
    }
    setTimeout(() => {
      setCheckLogin(false);
    }, 1000);
  }, [navigate]);

  if (checkLogin) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute isLogin={isLogin}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
