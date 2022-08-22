import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import { ProtectedRoute } from "./views/components";
import {
  Dashboard,
  Detail,
  Home,
  Login,
  Page404,
  Register,
} from "./views/pages";
const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:id"
          element={
            <ProtectedRoute>
              <Detail />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
