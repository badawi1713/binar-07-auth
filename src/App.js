import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { PrivateRoute } from "./views/components";
import { Dashboard, Login, Register } from "./views/pages";
const App = () => {
  const [isLogin, setIsLogin] = useState(null);
  const [checkLogin, setCheckLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
    setTimeout(() => {
      setCheckLogin(false);
    }, 1000);
  }, []);

  if (checkLogin) {
    return <p>Loading</p>
  }

  if (isLogin) {
    <Navigate to="/" />;
  }

  return (
    <Router>
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
    </Router>
  );
};

export default App;
